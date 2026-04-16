
const { createClient } = require('@libsql/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

// Helper for ID generation (simple replacement for nanoid if missing or ESM)
// Use installed nanoid (commonjs compatible or dynamic import if needed)
// Since nanoid 4+ is ESM, and this is a CJS script, we might need dynamic import or use custom safe function.
// Actually, earlier verify script failed with nanoid require? 
// Let's use a robust custom function to be safe, or just fix length.
// Standard nanoid alphabet is 64 chars.
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzict';
// The provided alphabet above is definitely NOT 64 chars. It looks like a random string.
// Let's use a standard alphanumeric string.
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
const generateId = (size = 21) => {
    let id = '';
    for (let i = 0; i < size; i++) {
        id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return id;
};

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.TURSO_DATABASE_URL || !process.env.GOOGLE_API_KEY) {
    console.error('Missing env variables');
    process.exit(1);
}

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function main() {
    console.log('Starting Test Generation Process...');

    try {
        // 1. Fetch pending item
        const rs = await client.execute("SELECT * FROM test_queue WHERE status = 'pending' LIMIT 1");
        if (rs.rows.length === 0) {
            console.log('No pending items found.');
            return;
        }

        const queueItem = rs.rows[0];
        console.log(`Processing item: ${queueItem.keyword} (ID: ${queueItem.id})`);

        // 2. Update status to processing
        await client.execute({
            sql: "UPDATE test_queue SET status = 'processing', processed_at = ? WHERE id = ?",
            args: [Date.now(), queueItem.id] // using Date.now() for integer timestamp if that's what schema expects (ts: integer)
        });

        // 3. Call AI
        console.log('Generating content with Gemini...');
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });

        const prompt = `
      You are an expert viral quiz creator for the Korean market.
      Create a high-quality "MBTI-style Personality Test" about: "${queueItem.keyword}".
      
      ## Constraints (STRICT)
      1. **Language**: Natural, trendy Korean (Internet slang allowed like '손절', '국룰').
      2. **Structure**: Exactly 12 Questions, 16 Results (MBTI types).
      3. **Tone**: Short, punchy, witty.
      4. **Question Length**: MUST be under 40 characters.
      5. **Logic**: Each choice MUST map to specific MBTI traits (E, I, S, N, T, F, J, P).
      
      ## Step 1: Define "Presets" (Thematic Analysis Keys)
      First, invent 3 creative analysis categories specific to this topic.
      Example for "Zombie Survival": 
      - role (생존 역할)
      - item (필수 아이템)
      - fate (최후의 결말)
      
      ## Step 2: Generate Content
      Return ONLY valid JSON.
      
      JSON Structure:
      {
        "title": "...",
        "description": "...",
        "slug": "...",
        "presetKeys": ["key1", "key2", "key3"], 
        "questions": [
          {
            "text": "Question (max 40 chars)",
            "choices": [
              { "text": "Choice A", "tags": ["E", "P"] }, 
              { "text": "Choice B", "tags": ["I", "J"] }
            ]
          }
        ],
        "results": [
          {
            "type": "ISTJ",
            "label": "Fun Nickname",
            "summary": "One-line summary",
            "traits": ["Trait1", "Trait2", "Trait3"],
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

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        let quizData;
        try {
            quizData = JSON.parse(cleanedText);
        } catch (e) {
            console.error('Failed to parse JSON:', responseText);
            throw new Error('JSON Parse failed');
        }

        // Validation
        if (quizData.questions.length !== 12) throw new Error("Invalid question count");
        if (quizData.results.length !== 16) throw new Error("Invalid result count");

        console.log(`Generated Quiz: ${quizData.title}`);

        // 4. Save to DB
        const testId = generateId();
        const now = Math.floor(Date.now() / 1000); // unixepoch in seconds

        // Insert Test
        await client.execute({
            sql: `INSERT INTO tests (id, slug, title, description, category, status, question_count, result_type_count, created_at, updated_at, published_at) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
                testId,
                `${quizData.slug}-${generateId(4)}`,
                quizData.title,
                quizData.description,
                'ai-generated',
                'published',
                quizData.questions.length,
                quizData.results.length,
                now,
                now,
                now
            ]
        });

        // Insert Questions
        for (let i = 0; i < quizData.questions.length; i++) {
            const q = quizData.questions[i];
            await client.execute({
                sql: `INSERT INTO questions (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    generateId(),
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
        for (const r of quizData.results) {
            await client.execute({
                sql: `INSERT INTO result_types (id, test_id, type_code, label, summary, traits, picks, match_types)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    generateId(),
                    testId,
                    r.type,
                    r.label,
                    r.summary,
                    JSON.stringify(r.traits),
                    JSON.stringify(r.presets), // Map Presets to picks
                    JSON.stringify({ best: r.recommend, worst: r.pitfalls }) // Map matchTypes
                ]
            });
        }

        // 5. Update Queue Success
        await client.execute({
            sql: "UPDATE test_queue SET status = 'completed', logs = 'Successfully generated via script v2' WHERE id = ?",
            args: [queueItem.id]
        });

        console.log(`Successfully created test: ${quizData.title} (${testId})`);

    } catch (error) {
        console.error('Process Error:', error);
    }
}

main();
