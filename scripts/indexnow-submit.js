/**
 * IndexNow Submission Script
 *
 * Usage:
 * node scripts/indexnow-submit.js [url1] [url2] ...
 *
 * If no URLs provided, verifies the API Key location only (dry run).
 */

const RAW_INDEXNOW_HOST = process.env.INDEXNOW_HOST || 'temon.kr'
const INDEXNOW_HOST = normalizeHost(RAW_INDEXNOW_HOST)
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '186d3c7ad0df4ce9ae53deb59055ed23'
const INDEXNOW_KEY_LOCATION = process.env.INDEXNOW_KEY_LOCATION || `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow'

function normalizeHost(value) {
    const trimmed = (value || '').trim().toLowerCase()

    if (!trimmed) {
        return 'temon.kr'
    }

    try {
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            return new URL(trimmed).hostname
        }

        return new URL(`https://${trimmed}`).hostname
    } catch {
        return trimmed.replace(/^https?:\/\//, '').split('/')[0]
    }
}

async function submitToIndexNow(urls) {
    console.log(`🚀 Submitting to IndexNow...`)
    console.log(`Host: ${INDEXNOW_HOST}`)
    console.log(`Key Location: ${INDEXNOW_KEY_LOCATION}`)

    const payload = {
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls,
    }

    try {
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(payload),
        })

        if (response.status === 200 || response.status === 202) {
            console.log(`✅ Success! Submitted ${urls.length} URLs. (Status: ${response.status})`)
        } else {
            console.error(`❌ Failed. Status: ${response.status} ${response.statusText}`)
            const text = await response.text()
            if (text) console.error(`Response: ${text}`)
        }
    } catch (error) {
        console.error(`❌ Network Error:`, error.message)
    }
}

async function verifyKeyLocation() {
    console.log(`🔍 Verifying Key File Access...`)
    try {
        const response = await fetch(INDEXNOW_KEY_LOCATION)
        if (response.status === 200) {
            const text = await response.text()
            if (text.trim() === INDEXNOW_KEY) {
                console.log(`✅ Key file accessible and valid.`)
            } else {
                console.warn(`⚠️ Key file accessible but content mismatch.`)
                console.warn(`Expected: ${INDEXNOW_KEY}`)
                console.warn(`Got: ${text.trim()}`)
            }
        } else {
            console.warn(`⚠️ Key file not accessible yet (Status: ${response.status}). Is the site deployed?`)
        }
    } catch (error) {
        console.warn(`⚠️ Could not reach key file: ${error.message}`)
    }
}

async function main() {
    const args = process.argv.slice(2)

    if (args.length === 0) {
        console.log(`ℹ️ No URLs provided. Performing connectivity check...`)
        await verifyKeyLocation()
        console.log(`\nTo submit URLs, run:`)
        console.log(`npm run indexnow https://${INDEXNOW_HOST}/tests/new-test`)
        return
    }

    const validUrls = args.filter((url) => {
        try {
            const parsed = new URL(url)
            return parsed.hostname.toLowerCase() === INDEXNOW_HOST
        } catch {
            return false
        }
    })

    if (validUrls.length === 0) {
        console.error(`❌ No valid URLs provided. URLs must be absolute and match host: ${INDEXNOW_HOST}`)
        return
    }

    await submitToIndexNow(validUrls)
}

main()
