import { checkIPAccess } from '$lib/check'

export async function load() {
    return await checkIPAccess()
}
