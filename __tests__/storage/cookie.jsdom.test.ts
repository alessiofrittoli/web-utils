/**
 * @jest-environment jsdom
 */
import { Cookie, Priority, SameSite } from '@/storage/Cookie'


describe( 'Cookie', () => {

	enum CookieName
	{
		COOKIE_1	= 'cookie-1',
		COOKIE_2	= 'cookie-2',
	}

	interface Cookie1
	{
		test: 'value'
	}
	
	
	interface Cookie2
	{
		test: boolean
	}

	interface CookiesMap
	{
		[ CookieName.COOKIE_1 ]: Cookie1
		[ CookieName.COOKIE_2 ]: Cookie2
	}
	
	const cookie1 = Cookie.parse<CookieName, Cookie1>( {
		name		: CookieName.COOKIE_1,
		value		: { test: 'value' },
		path		: '/specific-path',
		priority	: Priority.High,
		expires		: Date.now() + 20 * 60 * 1000,
		domain		: 'example.com',
		secure		: true,
		httpOnly	: true,
		sameSite	: SameSite.Lax,
		maxAge		: Date.now() + 30 * 60 * 1000,
		partitioned	: true,
	} )

	const cookie2 = Cookie.parse<CookieName, Cookie2>( {
		name		: CookieName.COOKIE_2,
		value		: { test: true },
	} )

	const defaultCookies = [ cookie1, cookie2 ]

	beforeEach( () => {

		let cookieValue = defaultCookies.map(
			cookie => Cookie.toString<CookieName, CookiesMap[ CookieName ]>( cookie )
		).join( '; ' )

		Object.defineProperty( document, 'cookie', {
			configurable: true,
			get	: () => cookieValue,
			set	: value => {
				const cookies	= Cookie.fromListString( cookieValue )
				const newCookie	= Cookie.fromString( value )

				if ( ! newCookie ) return

				cookies.set( newCookie.get( 'name' ), newCookie )

				cookieValue = Array.from( cookies.entries() )
					.map( ( [, cookie ] ) => Cookie.toString( cookie ) )
					.join( '; ' )

			},
		} )

	} )


	describe( 'Cookie.get()', () => {

		it( 'returns a Cookie Map if any from Document.cookie', () => {
			expect( Cookie.get<Cookie1>( CookieName.COOKIE_1 ) )
				.toBeInstanceOf( Map )

			expect( Cookie.get( 'unexisting-cookie' ) )
				.toBeUndefined()
		} )

	} )


	describe( 'Cookie.getAll()', () => {

		it( 'returns all cookies found in Document.cookie', () => {
			const cookies = Cookie.getAll()
			expect( cookies.size ).toBe( 2 )
		} )

	} )


	describe( 'Cookie.set()', () => {

		it( 'sets a cookie to `Document.cookie` with the given Cookie parameters', () => {
			expect( Cookie.set( { name: 'testcookie' } ) ).toBeInstanceOf( Map )
			expect(
				Cookie.fromListString( document.cookie ).has( 'testcookie' )
			).toBe( true )
		} )

		it( 'sets a custom path', () => {
			Cookie.set( { name: 'testcookie', path: '/path' } )

			expect(
				Cookie.fromListString( document.cookie ).get( 'testcookie' )?.get( 'path' )
			).toBe( '/path' )
		} )

	} )


	describe( 'Cookie.delete()', () => {
		it( 'removes a cookie from Document.cookie by setting `Max-Age` to zero', () => {
			
			Cookie.delete( CookieName.COOKIE_1 )
			const cookies = Cookie.fromListString( document.cookie )

			expect( cookies.get( CookieName.COOKIE_1 )?.get( 'maxAge' ) )
				.toBe( 0 )
			
		} )
	} )

} )