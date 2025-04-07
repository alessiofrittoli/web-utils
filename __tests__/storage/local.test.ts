/**
 * @jest-environment jsdom
 */
import { LocalStorage } from '@/storage/LocalStorage'

describe( 'LocalStorage', () => {

	beforeEach( () => {
		localStorage.clear()
	} )


	describe( 'LocalStorage.set()', () => {

		it( 'sets an item', () => {
			LocalStorage.set( 'key', 'value' )
			expect( LocalStorage.get( 'key' ) ).toBe( 'value' )
		} )


		it( 'deletes an item if nullish or empty value is provided', () => {
			LocalStorage.set( 'key', 'value' )
			LocalStorage.set( 'key2', 'value' )
			LocalStorage.set( 'key3', 'value' )
			expect( LocalStorage.get( 'key' ) ).toBe( 'value' )
			expect( LocalStorage.get( 'key2' ) ).toBe( 'value' )
			expect( LocalStorage.get( 'key3' ) ).toBe( 'value' )
			
			LocalStorage.set( 'key', '' )
			LocalStorage.set( 'key2', undefined )
			LocalStorage.set( 'key3', null )

			expect( LocalStorage.get( 'key' ) ).toBe( undefined )
			expect( LocalStorage.get( 'key2' ) ).toBe( undefined )
			expect( LocalStorage.get( 'key3' ) ).toBe( undefined )
		} )

	} )
	
	
	describe( 'LocalStorage.get()', () => {

		it( 'gets an item', () => {
			LocalStorage.set( 'key', 'value' )
			expect( LocalStorage.get( 'key' ) ).toBe( 'value' )
		} )

		it( 'returns `undefined` for non-existing key', () => {
			expect( LocalStorage.get( 'nonExistingKey' ) ).toBeUndefined()
		} )

	} )


	describe( 'LocalStorage.delete()', () => {

		it( 'removes an item', () => {
			LocalStorage.set( 'key', 'value' )
			LocalStorage.delete( 'key' )
			expect( LocalStorage.get( 'key' ) ).toBeUndefined()
		} )

	} )


	describe( 'LocalStorage.clear()', () => {

		it( 'clears all items', () => {
			LocalStorage.set( 'key1', 'value1' )
			LocalStorage.set( 'key2', 'value2' )
			LocalStorage.clear()
			expect( LocalStorage.get( 'key1' ) ).toBeUndefined()
			expect( LocalStorage.get( 'key2' ) ).toBeUndefined()
		} )

	} )

	describe( 'LocalStorage.key()', () => {

		it( 'returns the correct key for a given index', () => {
			LocalStorage.set( 'key1', 'value1' )
			LocalStorage.set( 'key2', 'value2' )
			expect( LocalStorage.key( 0 ) ).toBe( 'key1' )
			expect( LocalStorage.key( 1 ) ).toBe( 'key2' )
		} )

	} )

	describe( 'LocalStorage.getLength()', () => {

		it( 'returns the correct length', () => {
			expect( LocalStorage.getLength() ).toBe( 0 )
			LocalStorage.set( 'key1', 'value1' )
			expect( LocalStorage.getLength() ).toBe( 1 )
			LocalStorage.set( 'key2', 'value2' )
			expect( LocalStorage.getLength() ).toBe( 2 )
			LocalStorage.clear()
			expect( LocalStorage.getLength() ).toBe( 0 )
		} )

	} )

} )