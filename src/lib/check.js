export default async function checkAccess() {
    try {
        let res = await fetch('/api/check')
        if (res.ok) {
            let data = await res.json()
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
