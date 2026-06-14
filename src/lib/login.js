export default async function login(username, password) {
    let res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    let data = await res.json()

    if (!data.success) {
        throw new Error(data.message || 'Login failed')
    }

    return data
}
