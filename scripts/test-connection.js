const { createClient } = require("@libsql/client");
const dotenv = require("dotenv");
const path = require("path");

// Load .env.local
const result = dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (result.error) {
    console.error("Error loading .env.local:", result.error);
    process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log("Testing connection to:", url);
console.log("Token length:", authToken ? authToken.length : "missing");

const client = createClient({
    url,
    authToken,
});

async function test() {
    try {
        const rs = await client.execute("SELECT 1 as val");
        console.log("Connection successful!", rs);
    } catch (e) {
        console.error("Connection failed:", e);
    }
}

test();
