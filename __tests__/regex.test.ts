import { escapeRegExpCharSet } from '@/regex'


describe( 'escapeRegExpCharSet', () => {

	it( 'escapes all regex metacharacters', () => {

		const input		= '-\\^$*+?.()|[]{}';
		const expected	= '\\-\\\\\\^\\$\\*\\+\\?\\.\\(\\)\\|\\[\\]\\{\\}'

		expect( escapeRegExpCharSet( input ) ).toBe( expected )

	} )


	it( 'returns the same string if there are no metacharacters', () => {

		expect( escapeRegExpCharSet( 'abc123' ) ).toBe( 'abc123' )

	} )


	it( 'escapes metacharacters in a mixed string', () => {

		const input		= 'a+b(c)*d?e|f[g]h{i}j\\k^l$m.n-o'
		const expected	= 'a\\+b\\(c\\)\\*d\\?e\\|f\\[g\\]h\\{i\\}j\\\\k\\^l\\$m\\.n\\-o'

		expect( escapeRegExpCharSet( input ) ).toBe( expected )

	} )


	it( 'handles empty string', () => {

		expect( escapeRegExpCharSet( '' ) ).toBe( '' )

	} )


	it( 'escapes only the metacharacters and leaves other characters untouched', () => {

		const input		= 'hello-world$'
		const expected	= 'hello\\-world\\$'
		expect( escapeRegExpCharSet( input ) ).toBe( expected )

	} )

} )