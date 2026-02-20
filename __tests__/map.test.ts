import { getTypedMap, type TypedMap } from '@/map'

describe( 'getTypedMap', () => {
	
	interface User
	{
		name		: string
		age			: number
		isActive	: boolean
	}

	let typedMap: TypedMap<User>

	beforeEach( () => {
		typedMap = getTypedMap<User>()
	} )

	
	it( 'returns a new instance of Map with custom types', () => {
		expect( typedMap ).toBeInstanceOf( Map )
	} )
	
	
	it( 'accepts an iterable parameter as input', () => {
		expect( getTypedMap<User>( [
			[ 'name', 'Foo' ],
		] ).get( 'name' ) ).toBe( 'Foo' )
	} )

} )