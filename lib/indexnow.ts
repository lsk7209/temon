/**
 * IndexNow API Integration
 *
 * Automatically notifies search engines (Naver, Bing, etc.) about content changes.
 * Used for real-time indexing of new tests and updates.
 */

const RAW_INDEXNOW_HOST = process.env.INDEXNOW_HOST || 'temon.kr'
const INDEXNOW_HOST = normalizeHost(RAW_INDEXNOW_HOST)
const INDEXNOW_KEY = process.env.INDEXNOW_KEY?.trim()
const INDEXNOW_KEY_LOCATION = process.env.INDEXNOW_KEY_LOCATION?.trim()
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow'
const parsedTimeout = Number(process.env.INDEXNOW_TIMEOUT_MS || 8000)
const INDEXNOW_TIMEOUT_MS = Number.isFinite(parsedTimeout) && parsedTimeout > 0 ? parsedTimeout : 8000

export interface IndexNowResponse {
    success: boolean
    message: string
    status?: number
}

function normalizeHost(value: string): string {
    const trimmed = value.trim().toLowerCase()

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

/**
 * Submit URLs to IndexNow
 * @param urls Array of absolute URLs to submit (e.g., ['https://temon.kr/tests/new-test'])
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse> {
    if (!INDEXNOW_KEY) {
        return { success: false, message: 'INDEXNOW_KEY is not configured' }
    }

    const keyLocation = INDEXNOW_KEY_LOCATION || `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`

    if (!urls.length) {
        return { success: false, message: 'No URLs provided' }
    }

    // Ensure all URLs are absolute and belong to the configured host
    const validUrls = urls.filter((url) => {
        try {
            const parsed = new URL(url)
            return parsed.hostname.toLowerCase() === INDEXNOW_HOST
        } catch {
            return false
        }
    })

    if (!validUrls.length) {
        return { success: false, message: `No valid URLs for host found: ${INDEXNOW_HOST}` }
    }

    const payload = {
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: validUrls,
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), INDEXNOW_TIMEOUT_MS)

    try {
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        })

        if (response.status === 200 || response.status === 202) {
            return {
                success: true,
                message: `Successfully submitted ${validUrls.length} URLs to IndexNow`,
                status: response.status,
            }
        }

        return {
            success: false,
            message: `IndexNow API Error: ${response.status} ${response.statusText}`,
            status: response.status,
        }
    } catch (error) {
        console.error('IndexNow Submission Error:', error)
        return {
            success: false,
            message: `Network Error: ${error instanceof Error ? error.message : String(error)}`,
        }
    } finally {
        clearTimeout(timeoutId)
    }
}
