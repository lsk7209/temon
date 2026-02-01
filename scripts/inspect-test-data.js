
const { createClient } = require("@libsql/client")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
})

const TEST_ID = "eBIYeq00z_07zn8V7QOJJ"

async function inspectData() {
    try {
        console.log(`Inspecting test: ${TEST_ID}`)

        const testResult = await client.execute({
            sql: "SELECT * FROM tests WHERE id = ?",
            args: [TEST_ID]
        })
        console.log("TEST DATA:", testResult.rows[0])

        const questionsResult = await client.execute({
            sql: "SELECT * FROM questions WHERE test_id = ?",
            args: [TEST_ID]
        })
        console.log(`FOUND ${questionsResult.rows.length} QUESTIONS`)
        if (questionsResult.rows.length > 0) {
            console.log("ROW KEYS:", Object.keys(questionsResult.rows[0]))
            console.log("FIRST ROW RAW:", questionsResult.rows[0])
        }

    } catch (error) {
        console.error("Error:", error)
    }
}

inspectData()
