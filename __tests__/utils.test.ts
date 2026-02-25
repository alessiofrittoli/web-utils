import { getDimensions } from '@/utils'

describe( 'getDimensions', () => {

	it( 'returns undefined for both dimensions when no argument is provided', () => {

		expect( getDimensions() )
			.toEqual( [ undefined, undefined ] )

	} )
	
	
	it( 'returns 0 for both dimensions if 0 is passed', () => {
		
		expect( getDimensions( 0 ) )
			.toEqual( [ 0, 0 ] )

	} )


	it( 'returns the same value for both dimensions when a single number is provided', () => {

		expect( getDimensions( 300 ) )
			.toEqual( [ 300, 300 ] )
		
		expect( getDimensions( [ 300 ] ) )
			.toEqual( [ 300, 300 ] )

		expect( getDimensions( [ 300, undefined ] ) )
			.toEqual( [ 300, 300 ] )
		
		expect( getDimensions( [ undefined, 300 ] ) )
			.toEqual( [ 300, 300 ] )
		

	} )


	it( 'returns both dimensions when a tuple with two values is provided', () => {

		expect( getDimensions( [ 200, 300 ] ) )
			.toEqual( [ 200, 300 ] )

	} )

	
	it( 'handles string inputs', () => {

		expect( getDimensions( '300x300' ) )
			.toEqual( [ 300, 300 ] )
		
		expect( getDimensions( '0-1' ) )
			.toEqual( [ 0, 1 ] )
		
		expect( getDimensions( 'string with no numbers' ) )
			.toEqual( [ undefined, undefined ] )
		
	} )


	it( 'handles tuple with both undefined values', () => {

		// @ts-expect-error negative testing
		expect( getDimensions( [] ) )
			.toEqual( [ undefined, undefined ] )
		
		expect( getDimensions( [ undefined, undefined ] ) )
			.toEqual( [ undefined, undefined ] )

	} )
	
	
	it( 'handles NaN values', () => {
		
		expect( getDimensions( NaN ) )
			.toEqual( [ 0, 0 ] )
		
		expect( getDimensions( [ NaN ] ) )
			.toEqual( [ 0, 0 ] )
		
		expect( getDimensions( [ NaN, NaN ] ) )
			.toEqual( [ 0, 0 ] )
		
		expect( getDimensions( [ undefined, NaN ] ) )
			.toEqual( [ 0, 0 ] )
		
		expect( getDimensions( [ NaN, undefined ] ) )
			.toEqual( [ 0, 0 ] )

		expect( getDimensions( [ 300, NaN ] ) )
			.toEqual( [ 300, 0 ] )
		
		expect( getDimensions( [ NaN, 300 ] ) )
			.toEqual( [ 0, 300 ] )
		
	} )

} )