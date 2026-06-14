import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const strip = (s) => s.replace(/\/$/, '')

export async function GET(event) {
    try {
        const ip = event.getClientAddress()
        const JELLYFIN_URL = env.JELLYFIN_URL
        const JELLYFIN_PUBLIC_URL = env.JELLYFIN_PUBLIC_URL
        const PANGOLIN_API_URL = env.PANGOLIN_API_URL
        const PANGOLIN_API_KEY = env.PANGOLIN_API_KEY
        const RESOURCE_IDS = env.RESOURCE_IDS?.split(',').map((s) => s.trim())

        if (!PANGOLIN_API_URL || !PANGOLIN_API_KEY || !RESOURCE_IDS?.length) {
            console.error('Missing required environment variables')
            return json({ success: false, message: 'Server misconfiguration' }, { status: 500 })
        }

        let matchingRulesCount = 0
        for (const resourceId of RESOURCE_IDS) {
            const rulesRes = await event.fetch(
                `${strip(PANGOLIN_API_URL)}/v1/resource/${resourceId}/rules?limit=1000&offset=0`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${PANGOLIN_API_KEY}`,
                    },
                },
            )

            const rulesData = await rulesRes.json()

            for (const rule of rulesData.data?.rules || []) {
                if (rule.match === 'IP' && String(rule.value) === String(ip)) {
                    matchingRulesCount++
                    break
                }
            }
        }

        if (matchingRulesCount == RESOURCE_IDS.length) {
            return json({
                success: true,
                message: 'IP has full access',
                links: [{ href: JELLYFIN_PUBLIC_URL || JELLYFIN_URL, text: 'Jellyfin' }],
            })
        } else {
            return json({ success: false, message: 'IP does not have full access' }, { status: 403 })
        }
    } catch (err) {
        console.error('Unexpected error in /api/check', err)
        return json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}
