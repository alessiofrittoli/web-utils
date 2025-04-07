/**
 * @jest-environment jsdom
 */
import { SessionStorage } from '@/storage/SessionStorage'

describe( 'SessionStorage', () => {

	beforeEach( () => {
		sessionStorage.clear()
	} )
	

	describe( 'SessionStorage.set()', () => {

		it( 'sets an item', () => {
			SessionStorage.set( 'key', 'value' )
			expect( SessionStorage.get( 'key' ) ).toBe( 'value' )
		} )

		it( 'deletes an item if nullish or empty value is provided', () => {
			SessionStorage.set( 'key', 'value' )
			SessionStorage.set( 'key2', 'value' )
			SessionStorage.set( 'key3', 'value' )
			expect( SessionStorage.get( 'key' ) ).toBe( 'value' )
			expect( SessionStorage.get( 'key2' ) ).toBe( 'value' )
			expect( SessionStorage.get( 'key3' ) ).toBe( 'value' )
			
			SessionStorage.set( 'key', '' )
			SessionStorage.set( 'key2', undefined )
			SessionStorage.set( 'key3', null )

			expect( SessionStorage.get( 'key' ) ).toBe( undefined )
			expect( SessionStorage.get( 'key2' ) ).toBe( undefined )
			expect( SessionStorage.get( 'key3' ) ).toBe( undefined )
		} )

	} )
	
	
	describe( 'SessionStorage.get()', () => {

		it( 'gets an item', () => {
			SessionStorage.set( 'key', 'value' )
			expect( SessionStorage.get( 'key' ) ).toBe( 'value' )
		} )

		it( 'returns `undefined` for non-existing key', () => {
			expect( SessionStorage.get( 'nonExistingKey' ) ).toBeUndefined()
		} )

	} )


	describe( 'SessionStorage.delete()', () => {

		it( 'removes an item', () => {
			SessionStorage.set( 'key', 'value' )
			SessionStorage.delete( 'key' )
			expect( SessionStorage.get( 'key' ) ).toBeUndefined()
		} )

	} )


	describe( 'SessionStorage.clear()', () => {

		it( 'clears all items', () => {
			SessionStorage.set( 'key1', 'value1' )
			SessionStorage.set( 'key2', 'value2' )
			SessionStorage.clear()
			expect( SessionStorage.get( 'key1' ) ).toBeUndefined()
			expect( SessionStorage.get( 'key2' ) ).toBeUndefined()
		} )

	} )

	describe( 'SessionStorage.key()', () => {

		it( 'returns the correct key for a given index', () => {
			SessionStorage.set( 'key1', 'value1' )
			SessionStorage.set( 'key2', 'value2' )
			expect( SessionStorage.key( 0 ) ).toBe( 'key1' )
			expect( SessionStorage.key( 1 ) ).toBe( 'key2' )
		} )

	} )

	describe( 'SessionStorage.getLength()', () => {

		it( 'returns the correct length', () => {
			expect( SessionStorage.getLength() ).toBe( 0 )
			SessionStorage.set( 'key1', 'value1' )
			expect( SessionStorage.getLength() ).toBe( 1 )
			SessionStorage.set( 'key2', 'value2' )
			expect( SessionStorage.getLength() ).toBe( 2 )
			SessionStorage.clear()
			expect( SessionStorage.getLength() ).toBe( 0 )
		} )

	} )

} )