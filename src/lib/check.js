export default async function checkAccess() {
    try {
        const res = await fetch('/api/check')
        if (res.ok) {
            const data = await res.json()
            if (data.success) {
                return {
                    hasAccess: data.success,
                    links: data.links || [],
                }
            }
        }
    } catch (err) {
        console.error('Error checking access:', err)
    }

    return {
        hasAccess: false,
        links: [],
    }
}
