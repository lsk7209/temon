
/**
 * Manual trigger for quiz generation logic (Simulation of /api/cron/generate)
 * Usage: node scripts/manual-generate-one.js
 */

const { createClient } = require('@libsql/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');
const { nanoid } = require('nanoid');

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.TURSO_DATABASE_URL) {
    console.error('TURSO_DATABASE_URL missing');
    process.exit(1);
}

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

async function main() {
    console.log('Starting manual generation...');

    try {
        // 1. Get pending item
        const rs = await client.execute("SELECT * FROM test_queue WHERE status = 'pending' LIMIT 1");
        if (rs.rows.length === 0) {
            console.log('No pending items found.');
            return;
        }

        const queueItem = rs.rows[0];
        console.log(`Processing item: ${queueItem.keyword} (${queueItem.id})`);

        // 2. Set status to processing
        await client.execute({
            sql: "UPDATE test_queue SET status = 'processing', processed_at = ? WHERE id = ?",
            args: [Date.now(), queueItem.id]
        });

        // 3. Call AI
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        // Same prompt as in route.ts
        const prompt = `
      Create a fun MBTI-style personality test about "${queueItem.keyword}".
      Language: Korean (Natural, viral, fun tone).
      Requirements:
      - 12 unique questions (E/I, S/N, T/F, J/P balanced)
      - 16 unique results (MBTI types)
      Output JSON format ONLY:
      {
        "title": "Main Title (catchy)",
        "description": "Short description (under 100 chars)",
        "slug": "english-slug-kebab-case",
        "questions": [
          {
            "text": "Question text (situation)",
            "choices": [
              { "text": "Choice 1", "tags": ["E", "S"] },
              { "text": "Choice 2", "tags": ["I", "N"] }
            ]
          }
        ],
        "results": [
           {
             "type": "ENFP", // MBTI type
             "label": "Result Name (fun nickname)",
             "summary": "Short summary",
             "traits": ["Trait 1", "Trait 2"],
             "presets": {
                "key1": ["Value..."],
                "key2": ["Value..."],
                "key3": ["Value..."]
             },
             "pitfalls": ["ENFP"], // Worst match MBTI codes
             "recommend": ["ESTJ"] // Best match MBTI codes
           }
        ]
      }
    `;

        console.log('Calling Gemini...');
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        let quizData;
        try {
            quizData = JSON.parse(cleanedText);
        } catch (e) {
            throw new Error("Failed to parse AI JSON response: " + cleanedText.substring(0, 100));
        }

        console.log('AI Response parsed successfully.');
        console.log(`Title: ${quizData.title}`);

        // Fill defaults for results if missing (just in case AI is lazy)
        // The prompt asks for 16 but sometimes it might generate fewer if not strictly enforced?
        // The prompt implies a full structure.

        const testId = nanoid();
        const testSlug = `${quizData.slug}-${nanoid(4)}`;

        // 4. Save to DB
        // Insert Test
        await client.execute({
            sql: `INSERT INTO tests (id, slug, title, description, category, status, question_count, result_type_count, created_at, updated_at) 
            VALUES (?, ?, ?, ?, 'ai-generated', 'draft', ?, ?, ?, ?)`,
            args: [
                testId,
                testSlug,
                quizData.title,
                quizData.description,
                quizData.questions.length,
                quizData.results.length || 16,
                Date.now(),
                Date.now()
            ]
        });

        // Insert Questions
        for (let i = 0; i < quizData.questions.length; i++) {
            const q = quizData.questions[i];
            await client.execute({
                sql: `INSERT INTO questions (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    nanoid(),
                    testId,
                    i + 1,
                    q.text,
                    q.choices[0].text,
                    JSON.stringify(q.choices[0].tags),
                    q.choices[1].text,
                    JSON.stringify(q.choices[1].tags)
                ]
            });
        }

        // Insert Results
        if (quizData.results) {
            for (const r of quizData.results) {
                await client.execute({
                    sql: `INSERT INTO result_types (id, test_id, type_code, label, summary, traits, picks, tips, match_types)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    args: [
                        nanoid(),
                        testId,
                        r.type || 'UNKNOWN',
                        r.label,
                        r.summary,
                        JSON.stringify(r.traits || []),
                        JSON.stringify(r.presets || {}),
                        JSON.stringify(r.tips || []), // Adding validation if missing
                        JSON.stringify({ best: r.recommend, worst: r.pitfalls })
                    ]
                });
            }
        }

        console.log(`Saved Test ID: ${testId} with ${quizData.questions.length} questions and ${quizData.results?.length} results.`);

        // 5. Update Queue
        await client.execute({
            sql: "UPDATE test_queue SET status = 'completed', logs = ? WHERE id = ?",
            args: [`Successfully generated via manual script: ${testId}`, queueItem.id]
        });

        console.log('Done!');

    } catch (error) {
        console.error('Error:', error);
        // Try to update queue status to failed
        // Need queueItem in scope if we want to update it, but simplistic error handling for now
    }
}

main();
