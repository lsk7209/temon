const { createClient } = require("@libsql/client");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function check() {
    try {
        const rs = await client.execute("SELECT count(*) as count FROM page_visits");
        console.log("Page Visits:", rs.rows[0].count);

        const rs2 = await client.execute("SELECT count(*) as count FROM test_starts");
        console.log("Test Starts:", rs2.rows[0].count);
    } catch (e) {
        console.error("Query failed:", e);
    }
}

check();
