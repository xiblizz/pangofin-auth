import checkAccess from '$lib/check'

export async function load({ fetch }) {
    return await checkAccess(fetch)
}
