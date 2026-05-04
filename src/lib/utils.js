/**
 * Merges CSS class strings, filtering out falsy values.
 * @param {...(string|null|undefined|false)} classes
 * @returns {string}
 */
export function cn(...classes) {
	return classes.filter(Boolean).join(' ');
}
