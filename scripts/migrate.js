const { createClient } = require("@libsql/client");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load .env.local
const result = dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (result.error) {
    console.error("Error loading .env.local:", result.error);
    process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
    url,
    authToken,
});

async function migrate() {
    try {
        const migrationFile = path.join(__dirname, '..', 'drizzle', '0001_modern_slayback.sql');
        const sqlContent = fs.readFileSync(migrationFile, "utf-8");

        // Split by statement-breakpoint
        const statements = sqlContent.split("--> statement-breakpoint");

        console.log(`Found ${statements.length} statements to execute.`);

        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i].trim();
            if (!statement) continue;

            console.log(`Executing statement ${i + 1}...`);
            try {
                await client.execute(statement);
                console.log(`Statement ${i + 1} success.`);
            } catch (err) {
                // If table already exists, we might want to ignore or log
                if (err.message && err.message.includes("already exists")) {
                    console.log(`Statement ${i + 1} skipped (already exists).`);
                } else {
                    console.error(`Statement ${i + 1} failed:`, err);
                    throw err;
                }
            }
        }

        console.log("Migration completed successfully!");
    } catch (e) {
        console.error("Migration failed:", e);
        process.exit(1);
    }
}

migrate();
