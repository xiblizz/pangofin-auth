import checkAccess from '$lib/check'

export async function load() {
    return await checkAccess()
}
