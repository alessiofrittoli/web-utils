import { arrayUnique, arrayObjectUnique, listToArray, chunkInto } from '@/arrays'
import { shuffle, shuffleCopy } from '@/arrays'


describe( 'arrayUnique', () => {

	it( 'removes duplicate identifiers', () => {

		expect( arrayUnique( [ 1, 2, 2, 3, 1 ] ) )
			.toEqual( [ 1, 2, 3 ] )

		expect( arrayUnique( [ 'a', 'b', 'a', 'c', 'b' ] ) )
			.toEqual( [ 'a', 'b', 'c' ] )
		
		const pointer = {}

		expect( arrayUnique( [ pointer, 'b', pointer, 'c', 'b' ] ) )
			.toEqual( [ pointer, 'b', 'c' ] )

	} )


	it( 'returns empty array when input is empty', () => {

		expect( arrayUnique( [] ) ).toEqual( [] )
	} )


	it( 'returns same array if no duplicates', () => {

		expect( arrayUnique( [ 1, 2, 3 ] ) )
			.toEqual( [ 1, 2, 3 ] )
	
	} )

} )


describe( 'arrayObjectUnique', () => {

	it( 'removes duplicates by object property', () => {

		const arr = [
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
			{ id: 1, name: 'c' },
			{ id: 3, name: 'd' },
			{ id: 4, name: 'a' },
		]

		expect( arrayObjectUnique( arr, 'id' ) ).toEqual( [
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
			{ id: 3, name: 'd' },
			{ id: 4, name: 'a' },
		] )
		
		
		expect( arrayObjectUnique( arr, 'name' ) ).toEqual( [
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
			{ id: 1, name: 'c' },
			{ id: 3, name: 'd' },
		] )

	} )


	it( 'returns empty array when input is empty', () => {
		expect( arrayObjectUnique( [], 'id' ) ).toEqual( [] )
	} )


	it( 'returns same array if no duplicates by property', () => {

		const arr = [
			{ id: 1, name: 'a' },
			{ id: 2, name: 'b' },
		]

		expect( arrayObjectUnique( arr, 'id' ) ).toEqual( arr )
		
	} )

} )


describe( 'listToArray', () => {

	it( 'converts comma-separated string to array', () => {

		expect( listToArray( 'a,b,c' ) ).toEqual( [ 'a', 'b', 'c' ] )
		expect( listToArray( '1,2,3' ) ).toEqual( [ '1', '2', '3' ] )
		expect( listToArray( 'foo, bar, baz' ) ).toEqual( [ 'foo', 'bar', 'baz' ] )
		expect( listToArray( '  x , y ,z ' ) ).toEqual( [ 'x', 'y', 'z' ] )
		
	} )


	it( 'handles empty string', () => {
		expect( listToArray( '' ) ).toEqual( [] )
	} )


	it( 'handles string with only spaces', () => {
		expect( listToArray( '   ' ) ).toEqual( [] )
		expect( listToArray( '   ' ) ).toEqual( [] )
	} )


	it( 'handles string with trailing comma', () => {
		expect( listToArray( 'a,b,c,' ) ).toEqual( [ 'a', 'b', 'c' ] )
	} )


	it( 'handles string with leading comma', () => {
		expect( listToArray( ',a,b,c' ) ).toEqual( [ 'a', 'b', 'c' ] )
	} )


	it( 'handles string with multiple consecutive commas', () => {
		expect( listToArray( 'a,,b,,,c' ) ).toEqual( [ 'a', 'b', 'c' ] )
	} )

} )


describe( 'chunkInto', () => {

	const array = [ 1, 2, 3, 4, 5, 6, 7, 8 ]

	it( 'splits array into chunks of given size', () => {

		expect( chunkInto( array, { size: 2 } ) )
			.toEqual( [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ] )

		expect( chunkInto( array, { size: 3 } ) )
			.toEqual( [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ] )
		
	} )


	it( 'tries to split array into given number of chunks', () => {
		
		expect( chunkInto( array, { count: 4 } ) )
			.toEqual( [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ] )

		expect( chunkInto( [ 1, 2, 3, 4, 5 ], { count: 2 } ) )
			.toEqual( [ [ 1, 2, 3 ], [ 4, 5 ] ] )

	} )


	it( 'returns empty array when input is empty', () => {

		expect( chunkInto( [], { size: 3 } ) ).toEqual( [] )
		expect( chunkInto( [], { count: 2 } ) ).toEqual( [] )

	} )

	
	it( 'returns one chunk if size >= array.length', () => {

		expect( chunkInto( [ 1, 2, 3 ], { size: 3 } ) )
			.toEqual( [ [ 1, 2, 3 ] ] )
		expect( chunkInto( [ 1, 2, 3 ], { size: 10 } ) )
			.toEqual( [ [ 1, 2, 3 ] ] )

	} )


	it( 'doesn\'t return empty chunks if count >= array.length', () => {
		expect( chunkInto( [ 1, 2, 3 ], { count: 5 } ) )
			.toEqual( [ [ 1 ], [ 2 ], [ 3 ] ] )
	} )


	it( 'splits into chunk of 1 if no options or invalid options are provided', () => {
		// @ts-expect-error negative testing
		expect( chunkInto( [ 1, 2, 3 ] ) )
			.toEqual( [ [ 1 ], [ 2 ], [ 3 ] ] )
		
		// @ts-expect-error negative testing
		expect( chunkInto( [ 1, 2, 3 ], {} ) )
			.toEqual( [ [ 1 ], [ 2 ], [ 3 ] ] )
		
		expect( chunkInto( [ 1, 2, 3 ], { size: 0 } ) )
			.toEqual( [ [ 1 ], [ 2 ], [ 3 ] ] )

		expect( chunkInto( [ 1, 2, 3 ], { count: 0 } ) )
			.toEqual( [ [ 1 ], [ 2 ], [ 3 ] ] )
		
	} )
	
} )


describe( 'shuffle', () => {

	it( 'shuffles the array in place and returns the same array instance', () => {
		
		const arr		= [ 1, 2, 3, 4, 5 ]
		const original	= [ ...arr ]
		const result	= shuffle( arr )

		expect( result ).toBe( arr )
		expect( result.sort() ).toEqual( original.sort() )

	} )


	it( 'does not lose or duplicate elements', () => {

		const arr		= [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
		const original	= [ ...arr ]

		shuffle( arr )

		expect( arr.sort() ).toEqual( original.sort() )

	} )


	it( 'returns empty array when input is empty', () => {

		expect( shuffle( [] ) ).toEqual( [] )

	} )


	it( 'returns same array for single element', () => {
		
		const arr = [ 42 ]
		expect( shuffle( arr ) ).toEqual( [ 42 ] )

	} )


	it( 'can actually shuffle (statistical, not deterministic)', () => {

		const arr		= [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
		const results	= new Set<string>()

		for ( let i = 0; i < 20; i++ ) {
			const copy = [ ...arr ]
			shuffle( copy )
			results.add( copy.join( ',' ) )
		}

		// Should have more than 1 unique permutation
		expect( results.size ).toBeGreaterThan( 1 )

	} )

} )


describe( 'shuffleCopy', () => {

	it( 'returns a shuffled copy, leaving original array unchanged', () => {

		const arr		= [ 1, 2, 3, 4, 5 ]
		const original	= [ ...arr ]
		const shuffled	= shuffleCopy( arr )
		
		expect( shuffled ).not.toBe( arr )
		expect( shuffled.sort() ).toEqual( original.sort() )
		expect( arr ).toEqual( original )

	} )

} )