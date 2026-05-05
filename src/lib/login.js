export default function login(username, password) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                throw new Error(data.message || 'Login failed')
            }
            return data
        })
}
