import { json } from '@sveltejs/kit';

/**
 * GET /api/hello
 * Boilerplate API endpoint — returns a JSON greeting.
 */
export function GET({ url }) {
	const name = url.searchParams.get('name') ?? 'World';

	return json({
		message: `Hello, ${name}!`,
		timestamp: new Date().toISOString()
	});
}
