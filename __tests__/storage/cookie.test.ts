import { Cookie, Priority, RawCookie, SameSite } from '@/storage/Cookie'


describe( 'Cookie', () => {

	describe( 'Cookie.parse()', () => {

		it( 'returns a parsed Cookie Map', () => {

			const cookie = Cookie.parse( {
				name		: 'cookiename',
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
	
			expect( cookie ).toBeInstanceOf( Map )

		} )

		it( 'skips parsing if a Cookie Map object is provided', () => {

			const cookie = Cookie.parse( {
				name		: 'cookiename',
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
	
			expect( Cookie.parse( cookie ) ).toBe( cookie )

		} )


		it( 'allows custom `name` and `value` typing', () => {
			/** On-site stubbed cookie. */
			enum CookieName
			{
				TEST_COOKIE = 'cookiename'
			}

			interface TestCookieValue
			{
				test: 'value'
			}
			

			const cookie = Cookie.parse<CookieName, TestCookieValue>( {
				name	: CookieName.TEST_COOKIE,
				value	: { test: 'value' },
			} )

			expect( cookie ).toBeInstanceOf( Map )

		} )

		
		it( 'optionally set `expires`', () => {
			const expires	= Date.now() + 20 * 60 * 1000
			const cookie	= Cookie.parse( {
				name	: 'cookiename',
				expires	: expires,
			} )
	
			expect( cookie.get( 'expires' ) )
				.toEqual( new Date( expires ) )
		} )

		
		it( 'optionally set `maxAge`', () => {
			const expires	= Date.now() + 20 * 60 * 1000
			const cookie	= Cookie.parse( {
				name	: 'cookiename',
				maxAge	: expires,
			} )
	
			expect( cookie.get( 'maxAge' ) )
				.toBe( expires )
		} )


		it( 'optionally set `path`', () => {
			const cookie = Cookie.parse( {
				name	: 'cookiename',
				path	: '/specific-path',
			} )
	
			expect( cookie.get( 'path' ) ).toBe( '/specific-path' )
		} )


		it( 'optionally set `priority`', () => {
			const cookie = Cookie.parse( {
				name	: 'cookiename',
				priority: Priority.High,
			} )
	
			expect( cookie.get( 'priority' ) ).toBe( Priority.High )
		} )


		it( 'optionally set `domain`', () => {
			const cookie = Cookie.parse( {
				name	: 'cookiename',
				domain	: 'example.com',
			} )
	
			expect( cookie.get( 'domain' ) ).toBe( 'example.com' )
		} )


		it( 'optionally set `httpOnly`', () => {
			const cookie = Cookie.parse( {
				name		: 'cookiename',
				httpOnly	: true,
			} )
	
			expect( cookie.get( 'httpOnly' ) ).toBe( true )
		} )


		it( 'optionally set `secure`', () => {
			const cookie = Cookie.parse( {
				name	: 'cookiename',
				secure	: true,
			} )
	
			expect( cookie.get( 'secure' ) ).toBe( true )
		} )


		it( 'optionally set `sameSite`', () => {
			const cookie = Cookie.parse( {
				name	: 'cookiename',
				sameSite: SameSite.Lax,
			} )
	
			expect( cookie.get( 'sameSite' ) ).toBe( SameSite.Lax )
		} )


		it( 'optionally set `partitioned`', () => {
			const cookie = Cookie.parse( {
				name		: 'cookiename',
				partitioned	: true,
			} )
	
			expect( cookie.get( 'partitioned' ) ).toBe( true )
		} )

	} )


	describe( 'Cookie.toString()', () => {

		const options: RawCookie = {
			name		: 'cookiename',
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
		}
		const cookie = Cookie.parse( options )

		it( 'correctly stringify a Cookie', () => {
			const cookieString = Cookie.toString( options )

			expect( cookieString.includes( `${ cookie.get( 'name' ) }=${ JSON.stringify( cookie.get( 'value' ) ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Expires=${ new Date( cookie.get( 'expires' )! ).toUTCString() }` ) )
				.toBe( true )
			expect( cookieString.includes( `Max-Age=${ cookie.get( 'maxAge' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Path=${ cookie.get( 'path' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Priority=${ cookie.get( 'priority' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Domain=${ cookie.get( 'domain' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `HttpOnly=${ cookie.get( 'httpOnly' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Secure=${ cookie.get( 'secure' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `SameSite=${ cookie.get( 'sameSite' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Partitioned=${ cookie.get( 'partitioned' ) }` ) )
				.toBe( true )
		} )


		it( 'skips values with a falsey `key`', () => {
			console.log( 'skips values with a falsey', Cookie.toString( {
				name: 'testcookie',
				value: 'value',
				// @ts-expect-error fdfs
				[null]: '2024-10-24',
			} ) )
			
		} )

	} )


	describe( 'Cookie.fromString()', () => {
		const expires = new Date( Date.now() + 20 * 60 * 1000 )
		expires.setMilliseconds( 0 ) // ms are excluded from `Date.toUTCString()` output.

		const cookie = Cookie.parse( {
			name		: 'cookiename',
			value		: { test: 'value' },
			path		: '/specific-path',
			priority	: Priority.High,
			expires		: expires,
			domain		: 'example.com',
			secure		: true,
			httpOnly	: true,
			sameSite	: SameSite.Lax,
			maxAge		: Date.now() + 30 * 60 * 1000,
			partitioned	: true,
		} )
		

		it( 'correctly parse a Cookie Map', () => {
			expect( Cookie.fromString( Cookie.toString( cookie ) ) )
				.toEqual( cookie )
		} )


		it( 'returns null when wrong formatted cookie string is provided', () => {
			expect( Cookie.fromString( '' ) )
				.toBeNull()
		} )
		
		
		it( 'skips parameters with wrong format', () => {
			expect( Cookie.fromString( 'cookiename=value;=0' ) )
				.toEqual( new Map( [
					[ 'name', 'cookiename' ],
					[ 'value', 'value' ],
				] ) )
		} )
		

		it( 'skips parameters with nullish values', () => {
			expect( Cookie.fromString( 'cookiename=value;Expires=' ) )
				.toEqual( new Map( [
					[ 'name', 'cookiename' ],
					[ 'value', 'value' ],
				] ) )
		} )
		
		
		it( 'skips Expires parameter when invalid date is provided', () => {
			expect( Cookie.fromString( 'cookiename=value;Expires=Invalid Date' ) )
				.toEqual( new Map( [
					[ 'name', 'cookiename' ],
					[ 'value', 'value' ],
				] ) )
			
			expect( Cookie.fromString( 'cookiename=value;Expires=true' ) )
				.toEqual( new Map( [
					[ 'name', 'cookiename' ],
					[ 'value', 'value' ],
				] ) )
		} )
	} )


	describe( 'Cookie.parseValue()', () => {

		it( 'returns undefined when no value has been given', () => {

			expect( Cookie[ 'parseValue' ]( undefined ) )
				.toBeUndefined()

		} )

	} )


	describe( 'Cookie.fromListString()', () => {

		/** On-site stubbed cookie. */
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

		type CookiesMap = {
			[ CookieName.COOKIE_1 ]: Cookie1
			[ CookieName.COOKIE_2 ]: Cookie2
		}

		const expires = new Date( Date.now() + 20 * 60 * 1000 )
		expires.setMilliseconds( 0 ) // ms are excluded from `Date.toUTCString()` output.

		const cookiesList = [
			Cookie.parse<CookieName, Cookie1>( {
				name		: CookieName.COOKIE_1,
				value		: { test: 'value' },
				path		: '/specific-path',
				priority	: Priority.High,
				expires		: expires,
				domain		: 'example.com',
				secure		: true,
				httpOnly	: true,
				sameSite	: SameSite.Lax,
				maxAge		: Date.now() + 30 * 60 * 1000,
				partitioned	: true,
			} ),
			Cookie.parse<CookieName, Cookie2>( {
				name		: CookieName.COOKIE_2,
				value		: { test: true },
				path		: '/specific-path',
				priority	: Priority.High,
				expires		: expires,
				domain		: 'example.com',
				secure		: true,
				httpOnly	: true,
				sameSite	: SameSite.Lax,
				maxAge		: Date.now() + 30 * 60 * 1000,
				partitioned	: true,
			} ),
		]
		
		const cookies = Cookie.fromListString<CookiesMap>(
			cookiesList.map(
				cookie => Cookie.toString<CookieName, CookiesMap[ CookieName ]>( cookie )
			).join( '; ' )
		)

		it( 'returns a Map of Cookie Map indexed by Cookie Name', () => {
			expect ( cookies ).toBeInstanceOf( Map )

			expect( cookies.get( CookieName.COOKIE_1 )?.get( 'value' )?.test )
				.toBe( 'value' )

			expect( cookies.get( CookieName.COOKIE_2 )?.get( 'value' )?.test )
				.toBe( true )

		} )


		it( 'discards a wrong formatted cookie', () => {

			const cookies = Cookie.fromListString( '; cookiename=value;' )

			expect( cookies.size ).toBe( 1 )
			expect( cookies.get( 'cookiename' )?.get( 'value' ) )
				.toBe( 'value' )

		} )

	} )


	describe( 'Cookie.set()', () => {

		it( 'returns false if document is undefined', () => {

			const result = Cookie.set( {
				name	: 'testcookie',
				value	: 'testvalue',
			} )
	
			expect( result ).toBe( false )

		} )

	} )

} )