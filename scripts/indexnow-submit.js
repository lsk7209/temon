/**
 * IndexNow Submission Script
 * 
 * Usage:
 * node scripts/indexnow-submit.js [url1] [url2] ...
 * 
 * If no URLs provided, verifies the API Key location only (dry run).
 */

const INDEXNOW_HOST = 'temon.kr'
const INDEXNOW_KEY = '186d3c7ad0df4ce9ae53deb59055ed23'
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

async function submitToIndexNow(urls) {
    console.log(`🚀 Submitting to IndexNow...`)
    console.log(`Host: ${INDEXNOW_HOST}`)
    console.log(`Key Location: ${INDEXNOW_KEY_LOCATION}`)

    const payload = {
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls
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
        console.log(`npm run indexnow https://temon.kr/tests/new-test`)
        return
    }

    const validUrls = args.filter(url => url.startsWith('http'))

    if (validUrls.length === 0) {
        console.error(`❌ No valid URLs provided. URLs must start with http/https.`)
        return
    }

    await submitToIndexNow(validUrls)
}

main()
