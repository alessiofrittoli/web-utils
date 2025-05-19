import { arrayUnique, arrayObjectUnique } from '@/arrays'


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