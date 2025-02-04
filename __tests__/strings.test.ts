import { toKebabCase, ucFirst } from '@/strings'

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
			.toThrow( 'string.charAt is not a function' )

		// @ts-expect-error negative testing
		expect( () => ucFirst( true ) )
			.toThrow( 'string.charAt is not a function' )

		// @ts-expect-error negative testing
		expect( () => ucFirst( 1 ) )
			.toThrow( 'string.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( {} ) )
			.toThrow( 'string.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( () => {} ) )
			.toThrow( 'string.charAt is not a function' )
		
		// @ts-expect-error negative testing
		expect( () => ucFirst( [] ) )
			.toThrow( 'string.charAt is not a function' )

	} )

} )

describe( 'toKebabCase', () => {

	it( 'replaces an uppercase letter with a lowercase one prefixed with a dash', () => {

		expect( toKebabCase( 'fontFamily' ) )
			.toBe( 'font-family' )
		
		expect( toKebabCase( 'backgroundColor' ) )
			.toBe( 'background-color' )
		
		expect( toKebabCase( 'WebkitAlignContent' ) )
			.toBe( '-webkit-align-content' )

	} )

} )