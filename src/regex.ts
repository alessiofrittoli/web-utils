/**
 * Mitigates `ReDoS`, `Regex injection` and Unintended behavior from unescaped metacharacters
 * when compositing a Regex with uncontrolled data.
 * 
 * @param input The string to escape for use in a regular expression character set.
 * @returns The escaped string, safe for use inside a regular expression character set.
 */
export const escapeRegExpCharSet = ( input: string ) => (
	input.replace( /[-\\^$*+?.()|[\]{}]/g, '\\$&' )
)