import { lcFirst, parseValue, stringifyValue, toCamelCase, toKebabCase, ucFirst } from '@/strings'
import { addLeadingCharacter, addTrailingCharacter, removeLeadingCharacter, removeTrailingCharacter } from '@/strings'
import { recipientsToString, emailDataToString } from '@/strings'


describe( 'ucFirst', () => {

	it( 'returns the given string with first uppercase letter', () => {
		
		expect( ucFirst( 'some string' ) )
			.toBe( 'Some string' )

	} )
	
	
	it( 'throws a TypeError when a non-stirng value is provided', () => {

		// @ts-expect-error negative testing
		expect( () => ucFirst() )
			.toThrow( 'Cannot read properties of undefined (reading \'charAt\')' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( undefined ) )
			.toThrow( 'Cannot read properties of undefined (reading \'charAt\')' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( null ) )
			.toThrow( 'Cannot read properties of null (reading \'charAt\')' )

		// @ts-expect-error negative testing
		expect( () => ucFirst( false ) )
			.toThrow( 'input.charAt is not a function' )

		// @ts-expect-error negative testing
		expect( () => ucFirst( true ) )
			.toThrow( 'input.charAt is not a function' )

		// @ts-expect-error negative testing
		expect( () => ucFirst( 1 ) )
			.toThrow( 'input.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( {} ) )
			.toThrow( 'input.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( () => {} ) )
			.toThrow( 'input.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( [] ) )
			.toThrow( 'input.charAt is not a function' )

	} )

} )


describe( 'lcFirst', () => {

	it( 'returns the given string with first lowercase letter', () => {
		
		expect( lcFirst( 'Some string' ) )
			.toBe( 'some string' )

	} )
	
	
	it( 'throws a TypeError when a non-stirng value is provided', () => {

		// @ts-expect-error negative testing
		expect( () => lcFirst() )
			.toThrow( 'Cannot read properties of undefined (reading \'charAt\')' )
		
		// @ts-expect-error negative testing
		expect( () => lcFirst( undefined ) )
			.toThrow( 'Cannot read properties of undefined (reading \'charAt\')' )
		
		// @ts-expect-error negative testing
		expect( () => lcFirst( null ) )
			.toThrow( 'Cannot read properties of null (reading \'charAt\')' )

		// @ts-expect-error negative testing
		expect( () => lcFirst( false ) )
			.toThrow( 'input.charAt is not a function' )

		// @ts-expect-error negative testing
		expect( () => lcFirst( true ) )
			.toThrow( 'input.charAt is not a function' )

		// @ts-expect-error negative testing
		expect( () => lcFirst( 1 ) )
			.toThrow( 'input.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => lcFirst( {} ) )
			.toThrow( 'input.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => lcFirst( () => {} ) )
			.toThrow( 'input.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => lcFirst( [] ) )
			.toThrow( 'input.charAt is not a function' )

	} )

} )


describe( 'toCamelCase', () => {

	it( 'replaces a dash, underscore or space prefixed lowercase letters with an uppercase one', () => {

		expect( toCamelCase( 'font-family' ) )
			.toBe( 'fontFamily' )
		
		expect( toCamelCase( 'background-color' ) )
			.toBe( 'backgroundColor' )
		
		expect( toCamelCase( '-webkit-align-content' ) )
			.toBe( 'WebkitAlignContent' )
		
		expect( toCamelCase( 'some value' ) )
			.toBe( 'someValue' )
		
		expect( toCamelCase( 'some_value' ) )
			.toBe( 'someValue' )

		expect( toCamelCase( 'some value_with mixed_Cases' ) )
			.toBe( 'someValueWithMixedCases' )

		expect( toCamelCase( '-string@with#special$characters' ) )
			.toBe( 'StringWithSpecialCharacters' )

	} )

} )


describe( 'toKebabCase', () => {

	it( 'replaces an uppercase letter with a lowercase one prefixed with a dash', () => {

		expect( toKebabCase( 'fontFamily' ) )
			.toBe( 'font-family' )
		
		expect( toKebabCase( 'backgroundColor' ) )
			.toBe( 'background-color' )
		
		expect( toKebabCase( 'string with spaces' ) )
			.toBe( 'string-with-spaces' )
		
		expect( toKebabCase( 'string_with_underscores' ) )
			.toBe( 'string-with-underscores' )
		
		expect( toKebabCase( 'WebkitAlignContent' ) )
			.toBe( '-webkit-align-content' )

		expect( toKebabCase( 'some value_with mixed_Cases' ) )
			.toBe( 'some-value-with-mixed-cases' )

		expect( toKebabCase( '-string@with#special$characters' ) )
			.toBe( '-string-with-special-characters' )

	} )

} )


describe( 'stringifyValue', () => {

	it( 'stringifies Date objects', () => {

		expect( stringifyValue( new Date( 'Sat, 20 Apr 2025 16:20:00 GMT' ) ) )
			.toBe( '2025-04-20T16:20:00.000Z' )

	} )
	
	
	it( 'stringifies objects with `JSON.stringify()`', () => {

		expect( stringifyValue( null ) )
			.toBe( 'null' )
		
		expect( stringifyValue( { prop: 'value', prop2: true } ) )
			.toBe( '{"prop":"value","prop2":true}' )
		
		expect( stringifyValue( [ 1, 2, true, null, () => {} ] ) )
			.toBe( '[1,2,true,null,null]' )

		expect( stringifyValue( new Map( [
			[ 'key', 'value' ],
			[ 'key2', 'value' ],
		] ) ) ).toBe( '[["key","value"],["key2","value"]]' )

		expect( stringifyValue( new Headers( {
			key		: 'value',
			key2	: 'value',
		} ) ) ).toBe( '[["key","value"],["key2","value"]]' )

	} )
	
	
	it( 'stringifies other value types', () => {

		expect( stringifyValue( true ) )
			.toBe( 'true' )
		expect( stringifyValue( false ) )
			.toBe( 'false' )
		
		expect( stringifyValue( 0 ) )
			.toBe( '0' )
		expect( stringifyValue( 420 ) )
			.toBe( '420' )

	} )


	it( 'returns empty string with un-serializable valuee', () => {
		expect( stringifyValue( undefined ) )
			.toBe( '' )
		
		expect( stringifyValue( () => {} ) )
			.toBe( '' )

		expect( stringifyValue( new Promise<void>( resolve => resolve() ) ) )
			.toBe( '' )
	} )

} )


describe( 'parseValue', () => {

	it( 'parses Date strings to Date objects', () => {
		expect( parseValue<Date>(
			stringifyValue( new Date() )
		) ).toBeInstanceOf( Date )
	} )
	
	
	it( 'parses numeric strings to `number`', () => {
		expect( parseValue<number>( '12345' ) ).toBe( 12345 )
	} )
	
	
	it( 'returns `undefined` if no value has been given', () => {
		expect( parseValue() ).toBeUndefined()
	} )
	
	
	it( 'returns `undefined` if empty `string` has been given', () => {
		expect( parseValue( ' ' ) ).toBeUndefined()
	} )


	it( 'returns parsed value using JSON.parse() for valid JSON strings', () => {

		expect( parseValue<true>(
			stringifyValue( true )
		) ).toBe( true )
		
		expect( parseValue(
			stringifyValue( { key: 'value' } )
		) ).toEqual( { key: 'value' } )
		
		expect( parseValue(
			stringifyValue( [ 1, 2, 3, 4, 5 ] )
		) ).toEqual( [ 1, 2, 3, 4, 5 ] )

	} )
	
	
	it( 'returns value as is if JSON.parse() fails', () => {

		expect( parseValue( 'String value' ) ).toBe( 'String value' )

	} )
	
} )


describe( 'addLeadingCharacter', () => {

	it( 'adds the leading character if not present', () => {

		expect( addLeadingCharacter( 'test', '/' ) ).toBe( '/test' )
		expect( addLeadingCharacter( 'abc', '0' ) ).toBe( '0abc' )

	} )


	it( 'does not add the character if already present', () => {

		expect( addLeadingCharacter( '/test', '/' ) ).toBe( '/test' )
		expect( addLeadingCharacter( '0abc', '0' ) ).toBe( '0abc' )

	} )


	it( 'uses custom search regex if provided', () => {
		
		expect( addLeadingCharacter( 'test', '/', /^\/?/ ) ).toBe('/test')
		expect( addLeadingCharacter( '///test', '/', /^\/+/ ) ).toBe('/test')

	} )


	it( 'throws TypeError if input is not a string', () => {

		// @ts-expect-error negative testing
		expect( () => addLeadingCharacter( null, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => addLeadingCharacter( undefined, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => addLeadingCharacter( 123, '/' ) ).toThrow( 'Input must be a string.' )

	} )

} )


describe( 'removeLeadingCharacter', () => {

	it( 'removes the leading character if present', () => {

		expect( removeLeadingCharacter( '/test', '/' ) ).toBe( 'test' )
		expect( removeLeadingCharacter( '000abc', '0' ) ).toBe( 'abc' )

	} )


	it( 'does nothing if the character is not present', () => {

		expect( removeLeadingCharacter( 'test', '/' ) ).toBe( 'test' )
		expect( removeLeadingCharacter( 'abc', '0' ) ).toBe( 'abc' )

	} )


	it( 'uses custom regex if provided', () => {

		expect( removeLeadingCharacter( '///test', /^\/+/) ).toBe( 'test' )
		expect( removeLeadingCharacter( '...abc', /^\.+/) ).toBe( 'abc' )

	} )


	it( 'throws TypeError if input is not a string', () => {

		// @ts-expect-error negative testing
		expect( () => removeLeadingCharacter( null, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => removeLeadingCharacter( undefined, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => removeLeadingCharacter( 123, '/' ) ).toThrow( 'Input must be a string.' )

	} )

} )


describe( 'addTrailingCharacter', () => {
	
	it( 'adds the trailing character if not present', () => {

		expect( addTrailingCharacter( 'test', '/' ) ).toBe( 'test/' )
		expect( addTrailingCharacter( 'abc', '0' ) ).toBe( 'abc0' )

	} )


	it( 'does not add the character if already present', () => {
		
		expect( addTrailingCharacter( 'test/', '/' ) ).toBe( 'test/' )
		expect( addTrailingCharacter( 'abc0', '0' ) ).toBe( 'abc0' )

	} )


	it( 'uses custom search regex if provided', () => {

		expect( addTrailingCharacter( 'test', '/', /\/?$/) ).toBe( 'test/' )
		expect( addTrailingCharacter( 'test///', '/', /\/+$/) ).toBe( 'test/' )
	} )


	it( 'throws TypeError if input is not a string', () => {
		
		// @ts-expect-error negative testing
		expect( () => addTrailingCharacter( null, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => addTrailingCharacter( undefined, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => addTrailingCharacter( 123, '/' ) ).toThrow( 'Input must be a string.' )

	} )

} )


describe( 'removeTrailingCharacter', () => {

	it( 'removes the trailing character if present', () => {

		expect( removeTrailingCharacter( 'test/', '/' ) ).toBe( 'test' )
		expect( removeTrailingCharacter( 'abc000', '0' ) ).toBe( 'abc00' )

	} )


	it( 'does nothing if the character is not present', () => {

		expect( removeTrailingCharacter( 'test', '/' ) ).toBe( 'test' )
		expect( removeTrailingCharacter( 'abc', '0' ) ).toBe( 'abc' )

	} )


	it( 'uses custom regex if provided', () => {
		expect(removeTrailingCharacter('test///', /\/+$/)).toBe('test')
		expect(removeTrailingCharacter('abc...', /\.+$/)).toBe('abc')
	})


	it( 'throws TypeError if input is not a string', () => {

		// @ts-expect-error negative testing
		expect( () => removeTrailingCharacter( null, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => removeTrailingCharacter( undefined, '/' ) ).toThrow( 'Input must be a string.' )
		// @ts-expect-error negative testing
		expect( () => removeTrailingCharacter( 123, '/' ) ).toThrow( 'Input must be a string.' )

	} )

	
} )


describe( 'recipientsToString', () => {

	it( 'returns a single email string as is', () => {
		expect( recipientsToString( 'test@example.com' ) ).toBe( 'test@example.com' )
	} )


	it( 'returns a single recipient object with name as "Name<email>"', () => {
		expect( recipientsToString( { name: 'John Doe', email: 'john@example.com' } ) )
			.toBe( 'John Doe<john@example.com>' )
	} )


	it( 'returns a single recipient object without name as just the email', () => {
		expect( recipientsToString( { email: 'john@example.com' } ) )
			.toBe( 'john@example.com' )
	} )


	it( 'returns a comma-separated string for an array of email strings', () => {
		expect( recipientsToString( [ 'a@example.com', 'b@example.com' ] ) )
			.toBe( 'a@example.com,b@example.com' )
	} )


	it( 'returns a comma-separated string for an array of recipient objects', () => {
		expect(
			recipientsToString( [
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' },
			] )
		).toBe( 'Alice<alice@example.com>,Bob<bob@example.com>' )
	} )


	it( 'handles a mix of strings and objects', () => {
		expect(
			recipientsToString( [
				'test@example.com',
				{ name: 'John', email: 'john@example.com' },
				{ email: 'jane@example.com' },
			] )
		).toBe( 'test@example.com,John<john@example.com>,jane@example.com' )
	} )


	it( 'trims names and emails', () => {
		expect(
			recipientsToString( [
				{ name: '  John Doe  ', email: '  john@example.com  ' }
			] )
		).toBe( 'John Doe<john@example.com>' )
	} )


	it( 'skips recipients without email', () => {
		expect(
			recipientsToString( [
				//@ts-expect-error negative testing
				{ name: 'No Email' },
				{ email: 'valid@example.com' }
			] )
		).toBe( 'valid@example.com' )
	} )


	it( 'filters out any wrong recipient', () => {
		expect(
			recipientsToString( [
				'',
				// @ts-expect-error negative testing
				null,
				// @ts-expect-error negative testing
				undefined,
				// @ts-expect-error negative testing
				true,
				// @ts-expect-error negative testing
				() => {},
				{ email: 'a@example.com' },
			] )
		).toBe( 'a@example.com' )
	} )

} )


describe( 'emailDataToString', () => {

	it( 'returns mailto: with only to', () => {
		expect( emailDataToString( { to: 'a@example.com' } ) ).toBe( 'mailto:a@example.com' )
	} )

	it( 'returns mailto: with to and subject', () => {
		expect( emailDataToString( { to: 'a@example.com', subject: 'Hello' } ) )
			.toBe( 'mailto:a@example.com?subject=Hello' )
	} )

	it( 'returns mailto: with to, subject, and body', () => {
		expect( emailDataToString( { to: 'a@example.com', subject: 'Hello', body: 'World' } ) )
			.toBe( 'mailto:a@example.com?body=World&subject=Hello' )
	} )


	it( 'returns mailto: with cc and bcc', () => {
		expect(
			emailDataToString( {
				to: 'a@example.com',
				cc: [ 'b@example.com', { name: 'C', email: 'c@example.com' } ],
				bcc: 'd@example.com',
			} )
		).toBe( 'mailto:a@example.com?cc=b%40example.com%2CC%3Cc%40example.com%3E&bcc=d%40example.com' )
	} )


	it( 'correclty handles empty recipients', () => {
		expect(
			emailDataToString( {
				to	: 'a@example.com',
				cc	: [ '' ], // cc URL Search Param will not be added.
				bcc	: [ '' ], // bcc URL Search Param will not be added.
			} )
		).toBe( 'mailto:a@example.com' )
	} )


	it( 'returns mailto: with all fields', () => {
		expect(
			emailDataToString( {
				to		: [ { name: 'A', email: 'a@example.com' }, 'b@example.com' ],
				cc		: { email: 'c@example.com' },
				bcc		: [ { name: 'D', email: 'd@example.com' } ],
				subject	: 'Test Subject',
				body	: 'Test Body',
			} )
		).toBe(
			'mailto:A<a@example.com>,b@example.com?body=Test Body&subject=Test Subject&cc=c%40example.com&bcc=D%3Cd%40example.com%3E'
		)
	} )


	it( 'returns mailto: with no to and only params', () => {
		expect(
			emailDataToString( {
				subject	: 'Recipient is at your choice',
				body	: 'Just body',
			} )
		).toBe( 'mailto:?body=Just body&subject=Recipient is at your choice' )
	} )


	it( 'returns mailto: for empty input', () => {
		expect( emailDataToString() ).toBe( 'mailto:' )
	} )


	it( 'encodes special characters in params', () => {
		expect(
			emailDataToString( {
				to		: 'a@example.com',
				subject	: 'Hello & Welcome',
				body	: 'Line1\nLine2',
			} )
		).toBe(
			'mailto:a@example.com?body=Line1%0ALine2&subject=Hello %26 Welcome'
		)
	} )

} )