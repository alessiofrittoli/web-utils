import { filterObject, mapToObject, cloneObject, getObjectKey } from '@/objects'

describe( 'filterObject', () => {

	it( 'removes null and undefined properties from an object keeping input object untouched', () => {

		const obj = { a: 1, b: null, c: undefined, d: 0, e: false }

		const result = filterObject( obj )
		
		expect( obj )
			.toEqual( { a: 1, b: null, c: undefined, d: 0, e: false } )
		expect( result )
			.toEqual( { a: 1, d: 0, e: false } )

	} )


	it( 'does not remove properties with falsey but not null/undefined values', () => {

		const obj = { a: 0, b: '', c: false }
		const result = filterObject( obj )
		expect( result ).toEqual( obj )

	} )


	it( 'removes null and undefined elements from an array', () => {

		const arr = [ 1, null, 2, undefined, 3 ]
		const result = filterObject( arr )

		expect( Object.values( result ) )
			.toEqual( [ 1, 2, 3 ] )

	} )

} )


describe( 'mapToObject', () => {

	it( 'converts a Map to an Object', () => {

		const map = new Map<string, number>( [ [ 'a', 1 ], [ 'b', 2 ] ] )
		const obj = mapToObject( map )

		expect( obj ).toEqual( { a: 1, b: 2 } )

	} )


	it( 'returns an empty object for an empty Map', () => {

		const map = new Map()
		expect( mapToObject( map ) ).toEqual( {} )

	} )

} )


describe( 'cloneObject', () => {

	it( 'clones a plain object', () => {

		const obj	= { a: 1, b: 2 }
		const clone	= cloneObject( obj )

		expect( clone ).toEqual( obj )
		expect( clone ).not.toBe( obj )

	} )


	it( 'clones an object with prototype', () => {

		class Test { x = 1 }

		const instance	= new Test()
		const clone		= cloneObject( instance )

		expect( clone ).toEqual( instance )
		expect( clone ).not.toBe( instance )
		expect( clone ).toBeInstanceOf( Test )

	} )

} )


describe( 'getObjectKey', () => {

	it( 'returns the key for a given value', () => {

		const obj = { a: 1, b: 2, c: 3 }
		expect( getObjectKey( obj, 2 ) ).toBe( 'b' )

	} )


	it( 'returns undefined if value is not found', () => {

		const obj = { a: 1, b: 2 }
		expect( getObjectKey( obj, 3 ) ).toBeUndefined()

	} )

	it( 'returns the first matching key if multiple values match', () => {

		const obj = { a: 1, b: 1, c: 2 }

		expect( getObjectKey( obj, 1 ) ).toBe( 'a' )

	} )

} )