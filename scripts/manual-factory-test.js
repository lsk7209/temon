require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@libsql/client');
const { drizzle } = require('drizzle-orm/libsql');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { nanoid } = require('nanoid');

// Schema definitions (Simplified for script)
const testsTable = 'tests';
const questionsTable = 'questions';
const resultTypesTable = 'result_types';
const testQueueTable = 'test_queue';

async function runTest() {
    console.log('🚀 Starting Manual AI Factory Test...');

    // 1. DB Connect
    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const db = drizzle(client);
    console.log('✅ Connected to Turso DB');

    // 2. Add to Queue
    const keyword = "탕수육 부먹 찍먹 테스트";
    const queueId = nanoid();
    console.log(`📝 Adding to Queue: ${keyword}`);

    await client.execute({
        sql: "INSERT INTO test_queue (id, keyword, status, created_at) VALUES (?, ?, 'pending', unixepoch())",
        args: [queueId, keyword]
    });

    // 3. Generate
    console.log('🤖 Initializing Gemini...');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
      Create a viral personality test about "${keyword}" in Korean.
      Return valid JSON with:
      - title, description, slug (english)
      - 12 questions (each with 2 choices, each choice adds points to specific traits: 'E','I','S','N','T','F','J','P')
      - 16 result types (one for each MBTI: ISTJ, ISFJ... ENFP...).
      - For each result: label (fun name), summary, and traits.
      
      Output JSON Structure:
      {
        "title": "...",
        "description": "...",
        "slug": "...",
        "questions": [ { "text": "...", "choices": [ { "text": "...", "tags": ["E"] }, { "text": "...", "tags": ["I"] } ] } ],
        "results": [ { "type": "ENFP", "label": "...", "summary": "...", "traits": ["..."] } ... ]
      }
    `;

    console.log('⏳ Generating content (this may take 10-20s)...');
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    // console.log('DEBUG Response:', cleanedText.substring(0, 200) + '...');

    let quizData;
    try {
        quizData = JSON.parse(cleanedText);
    } catch (e) {
        console.error('❌ JSON Parse Failed:', e);
        return;
    }

    console.log(`✨ Generated: ${quizData.title} (${quizData.questions.length} questions, ${quizData.results.length} results)`);

    // 4. Save to DB
    const testId = nanoid();
    const slug = `${quizData.slug}-${nanoid(4)}`; // Unique slug

    // Save Test
    await client.execute({
        sql: "INSERT INTO tests (id, slug, title, description, category, status, question_count, result_type_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, unixepoch(), unixepoch())",
        args: [testId, slug, quizData.title, quizData.description, 'ai-generated', 'draft', quizData.questions.length, quizData.results.length]
    });

    // Save Questions
    for (let i = 0; i < quizData.questions.length; i++) {
        const q = quizData.questions[i];
        await client.execute({
            sql: "INSERT INTO questions (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            args: [nanoid(), testId, i + 1, q.text, q.choices[0].text, JSON.stringify(q.choices[0].tags), q.choices[1].text, JSON.stringify(q.choices[1].tags)]
        });
    }

    // Save Results
    for (const r of quizData.results) {
        await client.execute({
            sql: "INSERT INTO result_types (id, test_id, type_code, label, summary, traits, tips) VALUES (?, ?, ?, ?, ?, ?, ?)",
            args: [nanoid(), testId, r.type || r.typeCode, r.label, r.summary, JSON.stringify(r.traits), JSON.stringify(r.tips || [])]
        });
    }

    // Update Queue
    await client.execute({
        sql: "UPDATE test_queue SET status = 'completed', processed_at = unixepoch(), logs = 'Manual verification success' WHERE id = ?",
        args: [queueId]
    });

    console.log('✅ Saved to Database!');
    console.log(`🎉 TEST CREATED! ID: ${testId}, Slug: ${slug}`);
    console.log('Status: DRAFT (Use Update to Publish)');
}

runTest().catch(console.error);
