import { parseValue, stringifyValue, toCamelCase, toKebabCase, ucFirst } from '@/strings'

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