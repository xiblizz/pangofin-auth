/**
 * Page load function.
 * Fetches data from the /api/hello endpoint before rendering the page.
 * `fetch` provided by SvelteKit works on both server and client.
 */
export async function load({ fetch }) {
	const res = await fetch('/api/hello?name=SvelteKit');
	const data = await res.json();

	return { greeting: data };
}
