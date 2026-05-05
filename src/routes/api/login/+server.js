import { json, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { getUserIPs, getIPEntry, addUserIP, addIPRule, getIPRules, removeUserIP } from '$lib/db.js'

const strip = (s) => s.replace(/\/$/, '')

/** Deletes a Pangolin rule by rule id. */
async function deletePangolinRule(fetch, pangolinApiUrl, apiKey, resourceId, ruleId) {
    const url = `${strip(pangolinApiUrl)}/v1/resource/${resourceId}/rule/${ruleId}`
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
    })
    if (res.status < 200 || res.status >= 300) {
        console.error(`Failed to delete Pangolin rule ${ruleId} for resource ${resourceId}:`, await res.text())
    }
}

/** POST /api/login
 * Handles IP pass rule creation by validating credentials with Jellyfin.
 * Tracks the last 5 IPs per user in SQLite; evicts the oldest when a 6th is added.
 */
export async function POST(event) {
    try {
        const request = event.request
        const ip = event.getClientAddress()
        const { username, password } = await request.json()

        const JELLYFIN_URL = env.JELLYFIN_URL
        const PANGOLIN_API_URL = env.PANGOLIN_API_URL
        const PANGOLIN_API_KEY = env.PANGOLIN_API_KEY
        const RESOURCE_IDS = env.RESOURCE_IDS?.split(',').map((s) => s.trim())
        const MAX_IPS_PER_USER = parseInt(env.MAX_IPS_PER_USER) || 5

        if (!JELLYFIN_URL || !PANGOLIN_API_URL || !PANGOLIN_API_KEY || !RESOURCE_IDS?.length) {
            console.error('Missing required environment variables')
            return json({ success: false, message: 'Server misconfiguration' }, { status: 500 })
        }

        const authRes = await event.fetch(`${strip(JELLYFIN_URL)}/Users/AuthenticateByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'MediaBrowser Client="jellyfin-pangolin-auth", Device="Server", DeviceId="jellyfin-pangolin-auth", Version="1.0.0"',
            },
            body: JSON.stringify({ Username: username, Pw: password }),
        })

        if (authRes.status !== 200) {
            const text = await authRes.text()
            console.error('Auth failed', authRes.status, text)
            return json({ success: false, message: 'Invalid credentials' }, { status: 401 })
        }

        let userId = await authRes.json()
        userId = userId.User.Id

        const existingEntry = getIPEntry(userId, ip)

        if (!existingEntry) {
            // Evict the oldest IP if the user already has MAX_IPS_PER_USER tracked
            const userIPs = getUserIPs(userId)
            if (userIPs.length >= MAX_IPS_PER_USER) {
                const oldest = userIPs[0]
                const oldRules = getIPRules(oldest.id)
                for (const rule of oldRules) {
                    const res = await fetch(
                        `${strip(PANGOLIN_API_URL)}/v1/resource/${rule.resource_id}/rule/${rule.rule_id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${PANGOLIN_API_KEY}`,
                            },
                        },
                    )
                    if (res.status < 200 || res.status >= 300) {
                        console.error(
                            `Failed to delete Pangolin rule ${rule.rule_id} for resource ${rule.resource_id}:`,
                            await res.text(),
                        )
                    }
                }
                removeUserIP(oldest.id)
                console.log(`Evicted oldest IP ${oldest.ip} for user ${userId}`)
            }
        }

        // Add / verify Pangolin rules for the current IP
        const newRuleIds = {}

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

            let existingRuleId = null
            const usedPriorities = new Set()
            for (const rule of rulesData.data?.rules || []) {
                const prio = Number(rule.priority) || 0
                if (prio === 0 || prio === 1000) continue
                usedPriorities.add(prio)
                if (rule.match === 'IP' && String(rule.value) === String(ip)) {
                    existingRuleId = rule.ruleId ?? null
                }
            }

            let lowestFreePriority = 1
            while (usedPriorities.has(lowestFreePriority)) {
                lowestFreePriority++
                if (lowestFreePriority >= 1000) {
                    lowestFreePriority = 999
                    break
                }
            }

            if (existingRuleId !== null) {
                console.log(`IP ${ip} already has a rule for resource ${resourceId}, skipping`)
                newRuleIds[resourceId] = existingRuleId
                continue
            }

            const ruleRes = await event.fetch(`${strip(PANGOLIN_API_URL)}/v1/resource/${resourceId}/rule`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PANGOLIN_API_KEY}`,
                },
                body: JSON.stringify({
                    action: 'ACCEPT',
                    match: 'IP',
                    value: ip,
                    priority: lowestFreePriority,
                    enabled: true,
                }),
            })

            if (ruleRes.status < 200 || ruleRes.status >= 300) {
                console.error(`Failed to add IP pass rule for resource ${resourceId}:`, await ruleRes.text())
                return json(
                    { success: false, message: `Failed to add rule for resource ${resourceId}.` },
                    { status: 500 },
                )
            }

            const ruleData = await ruleRes.json()
            newRuleIds[resourceId] = ruleData.data?.ruleId
        }

        // Persist the new IP + its rule ids to the database
        if (!existingEntry) {
            const userIpId = addUserIP(userId, ip)
            for (const [resourceId, ruleId] of Object.entries(newRuleIds)) {
                if (ruleId !== undefined && ruleId !== null) {
                    addIPRule(userIpId, resourceId, ruleId)
                }
            }
            console.log(`Tracked new IP ${ip} for user ${userId}`)
        }

        // redirect to a url
        throw redirect(301, env.REDIRECT_URL || '/')
        return json({ success: true, message: 'Auth successful' })
    } catch (err) {
        // SvelteKit redirect/error responses are thrown intentionally — re-throw them
        if (err?.status && err?.location) throw err
        console.error('Unexpected error in /api/login', err)
        return json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}
