import { Storage } from '@/storage/Storage'

describe( 'Storage', () => {
	
	describe( 'Storage.stringifyValue()', () => {

		it( 'stringifies Date objects', () => {

			expect( Storage.stringifyValue( new Date( 'Sat, 20 Apr 2025 16:20:00 GMT' ) ) )
				.toBe( '2025-04-20T16:20:00.000Z' )

		} )
		
		
		it( 'stringifies objects with `JSON.stringify()`', () => {

			expect( Storage.stringifyValue( null ) )
				.toBe( 'null' )
			
			expect( Storage.stringifyValue( { prop: 'value', prop2: true } ) )
				.toBe( '{"prop":"value","prop2":true}' )
			
			expect( Storage.stringifyValue( [ 1, 2, true, null, () => {} ] ) )
				.toBe( '[1,2,true,null,null]' )

			expect( Storage.stringifyValue( new Map( [
				[ 'key', 'value' ],
				[ 'key2', 'value' ],
			] ) ) ).toBe( '[["key","value"],["key2","value"]]' )

			expect( Storage.stringifyValue( new Headers( {
				key		: 'value',
				key2	: 'value',
			} ) ) ).toBe( '[["key","value"],["key2","value"]]' )

		} )
		
		
		it( 'stringifies other value types', () => {

			expect( Storage.stringifyValue( true ) )
				.toBe( 'true' )
			expect( Storage.stringifyValue( false ) )
				.toBe( 'false' )
			
			expect( Storage.stringifyValue( 0 ) )
				.toBe( '0' )
			expect( Storage.stringifyValue( 420 ) )
				.toBe( '420' )

		} )


		it( 'returns empty string with un-serializable valuee', () => {
			expect( Storage.stringifyValue( undefined ) )
				.toBe( '' )
			
			expect( Storage.stringifyValue( () => {} ) )
				.toBe( '' )

			expect( Storage.stringifyValue( new Promise<void>( resolve => resolve() ) ) )
				.toBe( '' )
		} )

	} )


	describe( 'Storage.parseValue()', () => {

		it( 'parses Date strings to Date objects', () => {
			expect( Storage.parseValue<Date>(
				Storage.stringifyValue( new Date() )
			) ).toBeInstanceOf( Date )
		} )
		
		
		it( 'parses numeric strings to `number`', () => {
			expect( Storage.parseValue<number>( '12345' ) ).toBe( 12345 )
		} )
		
		
		it( 'returns `undefined` if no value has been given', () => {
			expect( Storage.parseValue() ).toBeUndefined()
		} )
		
		
		it( 'returns `undefined` if empty `string` has been given', () => {
			expect( Storage.parseValue( ' ' ) ).toBeUndefined()
		} )


		it( 'returns parsed value using JSON.parse() for valid JSON strings', () => {

			expect( Storage.parseValue<true>(
				Storage.stringifyValue( true )
			) ).toBe( true )
			
			expect( Storage.parseValue(
				Storage.stringifyValue( { key: 'value' } )
			) ).toEqual( { key: 'value' } )
			
			expect( Storage.parseValue(
				Storage.stringifyValue( [ 1, 2, 3, 4, 5 ] )
			) ).toEqual( [ 1, 2, 3, 4, 5 ] )

		} )
		
		
		it( 'returns value as is if JSON.parse() fails', () => {

			expect( Storage.parseValue( 'String value' ) ).toBe( 'String value' )

		} )

	} )
	
} )