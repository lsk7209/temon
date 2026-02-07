
const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
    try {
        const testId = 'PwaFA0Dg00H46-k2S83dX';
        const results = await client.execute({ sql: "SELECT * FROM result_types WHERE test_id = ? LIMIT 1", args: [testId] });
        const r = results.rows[0];

        console.log('Result Type Sample:');
        console.log('Traits:', r.traits);
        console.log('Picks:', r.picks);
        console.log('Tips:', r.tips);
        console.log('Match Types:', r.match_types);
    } catch (e) {
        console.error(e);
    }
}

main();
