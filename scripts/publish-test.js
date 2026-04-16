
const { createClient } = require("@libsql/client")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN")
    process.exit(1)
}

const client = createClient({
    url,
    authToken,
})

const TEST_ID = "eBIYeq00z_07zn8V7QOJJ"

async function publishTest() {
    try {
        console.log(`Publishing test: ${TEST_ID}...`)

        await client.execute({
            sql: "UPDATE tests SET status = 'published', published_at = CURRENT_TIMESTAMP WHERE id = ?",
            args: [TEST_ID]
        })

        const result = await client.execute({
            sql: "SELECT * FROM tests WHERE id = ?",
            args: [TEST_ID]
        })

        console.log("Test updated:", result.rows[0])

    } catch (error) {
        console.error("Error publishing test:", error)
    }
}

publishTest()
