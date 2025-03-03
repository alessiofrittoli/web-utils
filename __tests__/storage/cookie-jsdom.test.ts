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
		Name		: CookieName.COOKIE_1,
		Value		: { test: 'value' },
		Path		: '/specific-path',
		Priority	: Priority.High,
		Expires		: Date.now() + 20 * 60 * 1000,
		Domain		: 'example.com',
		Secure		: true,
		HttpOnly	: true,
		SameSite	: SameSite.Lax,
		MaxAge		: Date.now() + 30 * 60 * 1000,
		Partitioned	: true,
	} )

	const cookie2 = Cookie.parse<CookieName, Cookie2>( {
		Name		: CookieName.COOKIE_2,
		Value		: { test: true },
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

				cookies.set( newCookie.get( 'Name' ), newCookie )

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


	describe( 'Cookie.set()', () => {

		it( 'accepts an object with Cookie parameters', () => {
			const cookie = Cookie.set( {
				Name: 'testcookie',
			} )

			expect( cookie ).toBeInstanceOf( Map )
			expect(
				Cookie.fromListString( document.cookie ).has( 'testcookie' )
			).toBe( true )
		} )


		it( 'accepts an object with a Cookie Map', () => {
			const cookie = Cookie.parse( {
				Name: 'testcookie',
			} )
			expect( Cookie.set( cookie ) ).toBe( cookie )
			expect(
				Cookie.fromListString( document.cookie ).has( 'testcookie' )
			).toBe( true )

		} )

	} )


	describe( 'Cookie.delete()', () => {
		it( 'removes a cookie from Document.cookie by setting `Max-Age` to zero', () => {
			
			Cookie.delete( CookieName.COOKIE_1 )
			const cookies = Cookie.fromListString( document.cookie )

			expect( cookies.get( CookieName.COOKIE_1 )?.get( 'MaxAge' ) )
				.toBe( 0 )
			
		} )
	} )

} )