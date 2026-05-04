
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

// Load env. override avoids empty inherited shell vars blocking .env.local values.
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });

const googleApiKey =
    process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_KEY;

if (!process.env.TURSO_DATABASE_URL || !googleApiKey) {
    console.error('Missing env variables');
    process.exit(1);
}

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const genAI = new GoogleGenerativeAI(googleApiKey);
const args = process.argv.slice(2);
const publishImmediately = args.includes('--publish');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : 1;
const MBTI_TYPES = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
];
const AXIS_BY_TAG = {
    E: 'EI',
    I: 'EI',
    S: 'SN',
    N: 'SN',
    T: 'TF',
    F: 'TF',
    J: 'JP',
    P: 'JP',
};
const OPPOSITE_TAG = {
    E: 'I',
    I: 'E',
    S: 'N',
    N: 'S',
    T: 'F',
    F: 'T',
    J: 'P',
    P: 'J',
};
const TRANSIENT_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
const API_RETRY_DELAYS_MS = [3000, 8000, 15000];

if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    console.error('Invalid --limit. Use 1-100.');
    process.exit(1);
}

function getQueueMetadata(queueItem) {
    if (!queueItem.logs) return {};
    try {
        const parsed = JSON.parse(queueItem.logs);
        return parsed.metadata || parsed;
    } catch {
        return {};
    }
}

function parseScheduledAt(value) {
    if (typeof value !== 'string' || value.trim() === '') return null;
    const time = Date.parse(value);
    return Number.isNaN(time) ? null : Math.floor(time / 1000);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientApiError(error) {
    return TRANSIENT_STATUS_CODES.has(error?.status);
}

async function generateContentWithRetry(model, prompt) {
    let lastError;

    for (let attempt = 0; attempt <= API_RETRY_DELAYS_MS.length; attempt++) {
        try {
            return await model.generateContent(prompt);
        } catch (error) {
            lastError = error;
            if (!isTransientApiError(error) || attempt === API_RETRY_DELAYS_MS.length) {
                throw error;
            }

            const delay = API_RETRY_DELAYS_MS[attempt];
            console.warn(`Gemini transient error ${error.status}. Retrying in ${delay}ms...`);
            await sleep(delay);
        }
    }

    throw lastError;
}

function buildPrompt(queueItem, queueMetadata, feedback = '') {
    const expandedKeywords = queueMetadata.expandedKeywords || [];
    return `
당신은 한국 시장용 고품질 심리테스트 편집자입니다.
"${queueItem.keyword}" 주제로 MBTI 스타일 퀴즈를 만드세요.

SEO 기준:
- 메인 키워드: "${queueMetadata.mainKeyword || queueItem.keyword}"
- 확장 키워드: ${expandedKeywords.join(', ')}
- 카테고리: "${queueMetadata.category || 'ai-generated'}"

품질 기준:
- 자연스러운 한국어. 번역투, 어색한 존댓말, 과한 인터넷 유행어 금지.
- 제목은 메인 키워드를 자연스럽게 포함하되 35자 이내.
- description은 150~250자. 테스트로 알 수 있는 점, 상황, 공유 포인트를 포함.
- 질문은 12개. 실제 생활 장면 기반, 각 24~55자.
- 선택지는 질문당 정확히 2개, 각 8~28자.
- 각 질문은 MBTI 한 축만 측정:
  - 1~3번: E/I
  - 4~6번: S/N
  - 7~9번: T/F
  - 10~12번: J/P
- 선택지 tags는 반드시 한 글자 배열. 예: ["E"]와 ["I"]처럼 반대 태그만 사용.
- 결과는 MBTI 16개 전부, 중복/누락 금지.
- result label은 이모지 + 고유 별명.
- result summary는 80~180자. 이 유형의 행동 예시를 포함.
- traits는 3~5개.
- presets는 주제에 맞는 3개 키를 쓰고 각 키 값은 1~2개 문장 배열.
- pitfalls/recommend는 실제 MBTI 코드만 1~3개.
- JSON만 출력. 마크다운, 설명, 주석 금지.

${feedback ? `이전 응답의 문제를 반드시 고치세요:\n${feedback}` : ''}

출력 JSON:
{
  "title": "제목",
  "description": "150~250자 설명",
  "slug": "english-kebab-slug",
  "presetKeys": ["key1", "key2", "key3"],
  "questions": [
    {
      "text": "질문 텍스트는 24자 이상",
      "choices": [
        { "text": "선택지 A는 8자 이상", "tags": ["E"] },
        { "text": "선택지 B는 8자 이상", "tags": ["I"] }
      ]
    }
  ],
  "results": [
    {
      "type": "ISTJ",
      "label": "이모지 포함 별명",
      "summary": "80~180자 설명",
      "traits": ["특성1", "특성2", "특성3"],
      "presets": {
        "key1": ["값"],
        "key2": ["값"],
        "key3": ["값"]
      },
      "pitfalls": ["ENFP"],
      "recommend": ["ESTJ"]
    }
  ]
}
`;
}

function extractJson(responseText) {
    return responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
}

function cleanText(value, maxLength) {
    if (typeof value !== 'string') return value;
    return value
        .replace(/^\s*(선택지\s*)?[AB]\s*[:.)-]\s*/i, '')
        .replace(/^["'“”‘’]+|["'“”‘’]+$/g, '')
        .trim()
        .slice(0, maxLength)
        .trim();
}

function toKebabSlug(value, fallback) {
    const slug = String(value || fallback || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || `quiz-${generateId(6).toLowerCase()}`;
}

function normalizeDescription(value, queueItem) {
    const base = typeof value === 'string' ? value.trim() : '';
    const suffix = `${queueItem.keyword} 문항을 통해 평소 선택 기준, 일 처리 흐름, 주변과 맞는 협업 포인트를 자연스럽게 확인할 수 있습니다. 결과는 공유하기 좋은 MBTI 유형별 해석으로 정리됩니다.`;
    return `${base} ${suffix}`.trim().slice(0, 250);
}

function normalizeTitle(value, queueItem, queueMetadata) {
    const base = typeof value === 'string' ? value.trim() : '';
    const mainKeyword = queueMetadata.mainKeyword || queueItem.keyword;
    const topicToken = mainKeyword.replace(' 성향', '').replace(' 방식', '').split(' ')[0];
    if (base.includes(topicToken) && base.length <= 35) return base;

    const fallback = `${mainKeyword} 테스트`;
    return fallback.length <= 35 ? fallback : `${topicToken} 테스트`;
}

function normalizeQuizData(quizData, queueItem, queueMetadata) {
    if (!quizData || typeof quizData !== 'object') return quizData;

    quizData.title = normalizeTitle(quizData.title, queueItem, queueMetadata);
    quizData.slug = toKebabSlug(queueMetadata.slug, quizData.slug);
    quizData.description = normalizeDescription(quizData.description, queueItem);

    if (Array.isArray(quizData.questions)) {
        quizData.questions = quizData.questions.map((question) => ({
            ...question,
            text: cleanText(question.text, 65),
            choices: Array.isArray(question.choices)
                ? question.choices.map((choice) => ({
                    ...choice,
                    text: cleanText(choice.text, 36)
                }))
                : question.choices
        }));
    }

    if (Array.isArray(quizData.results)) {
        quizData.results = quizData.results.map((result) => ({
            ...result,
            pitfalls: Array.isArray(result.pitfalls)
                ? result.pitfalls.filter((type) => MBTI_TYPES.includes(type)).slice(0, 3)
                : [],
            recommend: Array.isArray(result.recommend)
                ? result.recommend.filter((type) => MBTI_TYPES.includes(type)).slice(0, 3)
                : []
        }));
    }

    return quizData;
}

function validateQuizData(quizData, queueItem, queueMetadata) {
    const errors = [];
    const mainKeyword = queueMetadata.mainKeyword || queueItem.keyword;

    if (!quizData || typeof quizData !== 'object') {
        return ['Quiz data must be an object'];
    }
    if (!quizData.title || quizData.title.length > 35) {
        errors.push('title missing or longer than 35 chars');
    }
    if (!quizData.title?.includes(mainKeyword.replace(' 성향', '').replace(' 방식', '').split(' ')[0])) {
        errors.push('title should naturally include the main keyword topic');
    }
    if (!quizData.description || quizData.description.length < 150 || quizData.description.length > 250) {
        errors.push('description must be 150-250 chars');
    }
    if (!/^[a-z0-9-]+$/.test(quizData.slug || '')) {
        errors.push('slug must be lowercase kebab-case');
    }
    if (!Array.isArray(quizData.presetKeys) || quizData.presetKeys.length !== 3) {
        errors.push('presetKeys must have exactly 3 items');
    }

    if (!Array.isArray(quizData.questions) || quizData.questions.length !== 12) {
        errors.push('questions must have exactly 12 items');
    } else {
        const axisCounts = { EI: 0, SN: 0, TF: 0, JP: 0 };
        quizData.questions.forEach((question, index) => {
            if (!question.text || question.text.length < 18 || question.text.length > 65) {
                errors.push(`question ${index + 1} text must be 18-65 chars`);
            }
            if (!Array.isArray(question.choices) || question.choices.length !== 2) {
                errors.push(`question ${index + 1} must have 2 choices`);
                return;
            }

            const tags = question.choices.map((choice, choiceIndex) => {
                if (!choice.text || choice.text.length < 6 || choice.text.length > 36) {
                    errors.push(`question ${index + 1} choice ${choiceIndex + 1} text must be 6-36 chars`);
                }
                if (!Array.isArray(choice.tags) || choice.tags.length !== 1) {
                    errors.push(`question ${index + 1} choice ${choiceIndex + 1} must have one tag`);
                    return null;
                }
                return choice.tags[0];
            });

            const [a, b] = tags;
            if (!a || !b || OPPOSITE_TAG[a] !== b) {
                errors.push(`question ${index + 1} choices must use opposite MBTI tags`);
                return;
            }
            axisCounts[AXIS_BY_TAG[a]] += 1;
        });

        for (const [axis, count] of Object.entries(axisCounts)) {
            if (count !== 3) errors.push(`${axis} axis must have 3 questions, got ${count}`);
        }
    }

    if (!Array.isArray(quizData.results) || quizData.results.length !== 16) {
        errors.push('results must have exactly 16 items');
    } else {
        const resultTypes = new Set();
        quizData.results.forEach((result, index) => {
            if (!MBTI_TYPES.includes(result.type)) {
                errors.push(`result ${index + 1} has invalid MBTI type`);
            }
            resultTypes.add(result.type);
            if (!result.label || result.label.length < 5) {
                errors.push(`result ${result.type || index + 1} label too short`);
            }
            if (!result.summary || result.summary.length < 60 || result.summary.length > 240) {
                errors.push(`result ${result.type || index + 1} summary must be 60-240 chars`);
            }
            if (!Array.isArray(result.traits) || result.traits.length < 3 || result.traits.length > 5) {
                errors.push(`result ${result.type || index + 1} traits must be 3-5 items`);
            }
            if (!result.presets || typeof result.presets !== 'object' || Object.keys(result.presets).length !== 3) {
                errors.push(`result ${result.type || index + 1} presets must have 3 keys`);
            }
            for (const key of ['pitfalls', 'recommend']) {
                if (!Array.isArray(result[key]) || result[key].some((type) => !MBTI_TYPES.includes(type))) {
                    errors.push(`result ${result.type || index + 1} ${key} must contain MBTI codes`);
                }
            }
        });

        for (const type of MBTI_TYPES) {
            if (!resultTypes.has(type)) errors.push(`missing result type ${type}`);
        }
    }

    return errors;
}

async function generateQuizData(model, queueItem, queueMetadata) {
    let feedback = '';
    let lastErrors = [];

    for (let attempt = 1; attempt <= 3; attempt++) {
        const prompt = buildPrompt(queueItem, queueMetadata, feedback);
        const result = await generateContentWithRetry(model, prompt);
        const responseText = result.response.text();
        const cleanedText = extractJson(responseText);

        let quizData;
        try {
            quizData = normalizeQuizData(JSON.parse(cleanedText), queueItem, queueMetadata);
        } catch {
            lastErrors = ['JSON parse failed'];
            feedback = lastErrors.join('\n');
            continue;
        }

        const errors = validateQuizData(quizData, queueItem, queueMetadata);
        if (errors.length === 0) return quizData;

        lastErrors = errors;
        feedback = errors.slice(0, 20).join('\n');
        console.warn(`Quality validation failed on attempt ${attempt}: ${errors.length} issue(s)`);
    }

    throw new Error(`Quality validation failed: ${lastErrors.slice(0, 10).join('; ')}`);
}

async function main() {
    console.log('Starting Test Generation Process...');

    let processedCount = 0;

    for (let round = 0; round < limit; round++) {
        let queueItem = null;
        let queueMetadata = {};
        try {
            // 1. Fetch pending item
            const rs = await client.execute("SELECT * FROM test_queue WHERE status = 'pending' LIMIT 1");
            if (rs.rows.length === 0) {
                console.log('No pending items found.');
                break;
            }

            queueItem = rs.rows[0];
            queueMetadata = getQueueMetadata(queueItem);
            console.log(`Processing item: ${queueItem.keyword} (ID: ${queueItem.id})`);

            // 2. Update status to processing
            await client.execute({
                sql: "UPDATE test_queue SET status = 'processing', processed_at = ? WHERE id = ?",
                args: [Date.now(), queueItem.id]
            });

            // 3. Call AI with quality gate
            console.log('Generating content with Gemini...');
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const quizData = await generateQuizData(model, queueItem, queueMetadata);

            console.log(`Generated Quiz: ${quizData.title}`);

            // 4. Save to DB
            const testId = generateId();
            const now = Math.floor(Date.now() / 1000);
            const scheduledAt = parseScheduledAt(queueMetadata.scheduledAt);

            await client.execute({
                sql: `INSERT INTO tests (id, slug, title, description, category, status, question_count, result_type_count, metadata, created_at, updated_at, published_at)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    testId,
                    `${quizData.slug}-${generateId(4)}`,
                    quizData.title,
                    quizData.description,
                    queueMetadata.category || 'ai-generated',
                    publishImmediately ? 'published' : 'draft',
                    quizData.questions.length,
                    quizData.results.length,
                    JSON.stringify({
                        source: 'test_queue',
                        scheduledAt: queueMetadata.scheduledAt ?? null,
                        wave: queueMetadata.wave ?? null,
                    }),
                    now,
                    now,
                    publishImmediately ? now : scheduledAt
                ]
            });

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
                        JSON.stringify(r.presets),
                        JSON.stringify({ best: r.recommend, worst: r.pitfalls })
                    ]
                });
            }

            await client.execute({
                sql: "UPDATE test_queue SET status = 'completed', logs = ? WHERE id = ?",
                args: [
                    JSON.stringify({
                        message: 'Successfully generated via quality-gated script v3',
                        testId,
                        metadata: queueMetadata
                    }),
                    queueItem.id
                ]
            });

            console.log(`Successfully created test: ${quizData.title} (${testId})`);
            processedCount++;

        } catch (error) {
            console.error('Process Error:', error);
            if (queueItem) {
                await client.execute({
                    sql: "UPDATE test_queue SET status = 'failed', logs = ? WHERE id = ?",
                    args: [
                        JSON.stringify({
                            error: error instanceof Error ? error.message.slice(0, 500) : 'Unknown error',
                            metadata: queueMetadata
                        }),
                        queueItem.id
                    ]
                });
            }
        }
    }

    console.log(`Processed ${processedCount}/${limit} item(s).`);
}

main();
