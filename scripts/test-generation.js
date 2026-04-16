
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });

const TOPIC = "직대딩 직장인 유형 테스트"; // Dummy topic

const prompt = `
      You are an expert viral quiz creator for the Korean market.
      Create a high-quality "MBTI-style Personality Test" about: "${TOPIC}".
      
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
        "title": "Main Title (Creative)",
        "description": "Short description",
        "slug": "english-slug-kebab-case",
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

async function main() {
    try {
        console.log(`Generating quiz for topic: ${TOPIC}...`);
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const json = JSON.parse(text);

        console.log('Generation Success!');
        console.log('Title:', json.title);
        console.log('Preset Keys:', json.presetKeys);
        console.log('Question 1:', json.questions[0].text);
        console.log('Result 1 Presets:', json.results[0].presets);

        fs.writeFileSync('generated-quiz.json', JSON.stringify(json, null, 2));
        console.log('Saved to generated-quiz.json');
    } catch (e) {
        console.error('Error:', e);
    }
}

main();
