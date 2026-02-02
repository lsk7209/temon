/**
 * IndexNow API Integration
 * 
 * Automatically notifies search engines (Naver, Bing, etc.) about content changes.
 * Used for real-time indexing of new tests and updates.
 */

const INDEXNOW_HOST = 'temon.kr'
const INDEXNOW_KEY = '186d3c7ad0df4ce9ae53deb59055ed23'
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export interface IndexNowResponse {
    success: boolean
    message: string
    status?: number
}

/**
 * Submit URLs to IndexNow
 * @param urls Array of absolute URLs to submit (e.g., ['https://temon.kr/tests/new-test'])
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse> {
    if (!urls.length) {
        return { success: false, message: 'No URLs provided' }
    }

    // Ensure all URLs are absolute and belong to the host
    const validUrls = urls.filter(url => url.includes(INDEXNOW_HOST))

    if (!validUrls.length) {
        return { success: false, message: 'No valid URLs for host found' }
    }

    const payload = {
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
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
