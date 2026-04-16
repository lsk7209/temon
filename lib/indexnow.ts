/**
 * IndexNow API Integration
 * 
 * Automatically notifies search engines (Naver, Bing, etc.) about content changes.
 * Used for real-time indexing of new tests and updates.
 */

const DEFAULT_HOST = 'temon.kr'
const DEFAULT_KEY = process.env.INDEXNOW_KEY || ''
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export interface IndexNowResponse {
    success: boolean
    message: string
    status?: number
}

function getIndexNowConfig() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${DEFAULT_HOST}`
    const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
    const host = new URL(normalizedBaseUrl).host
    const key = process.env.INDEXNOW_KEY || DEFAULT_KEY

    return {
        host,
        key,
        keyLocation: `${normalizedBaseUrl}/${key}.txt`,
    }
}

function normalizeUrls(urls: string[], host: string) {
    return Array.from(
        new Set(
            urls
                .map((url) => url.trim())
                .filter(Boolean)
                .filter((url) => {
                    try {
                        return new URL(url).host === host
                    } catch {
                        return false
                    }
                })
        )
    )
}

/**
 * Submit URLs to IndexNow
 * @param urls Array of absolute URLs to submit (e.g., ['https://temon.kr/tests/new-test'])
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse> {
    const { host, key, keyLocation } = getIndexNowConfig()

    if (!urls.length) {
        return { success: false, message: 'No URLs provided' }
    }

    const validUrls = normalizeUrls(urls, host)

    if (!validUrls.length) {
        return { success: false, message: 'No valid URLs for host found' }
    }

    const payload = {
        host,
        key,
        keyLocation,
        urlList: validUrls
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
            return {
                success: true,
                message: `Successfully submitted ${validUrls.length} URLs to IndexNow`,
                status: response.status
            }
        } else {
            return {
                success: false,
                message: `IndexNow API Error: ${response.status} ${response.statusText}`,
                status: response.status
            }
        }
    } catch (error) {
        console.error('IndexNow Submission Error:', error)
        return {
            success: false,
            message: `Network Error: ${error instanceof Error ? error.message : String(error)}`
        }
    }
}
