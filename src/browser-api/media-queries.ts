/**
 * Safely executes `window.matchMedia()` in server and browser environments.
 *
 * @param query The Media Query string to check.
 * @returns `false` if `window` is not defined or if the `document` currently doesn't matches the given `query`. `true` otherwise.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/matches)
 */
export const getMediaMatches = ( query: string ) => (
	typeof window !== 'undefined'
		? window.matchMedia( query ).matches
		: false
)