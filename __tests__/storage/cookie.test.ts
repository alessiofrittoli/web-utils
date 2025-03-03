import { Cookie, Priority, SameSite } from '@/storage/Cookie'


describe( 'Cookie', () => {

	describe( 'Cookie.parse()', () => {

		it( 'returns a parsed Cookie Map', () => {
			const cookie = Cookie.parse( {
				Name		: 'cookiename',
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
	
			expect( cookie ).toBeInstanceOf( Map )
		} )


		it( 'allows custom `Name` and `Value` typing', () => {
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
				Name	: CookieName.TEST_COOKIE,
				Value	: { test: 'value' },
			} )

			expect( cookie ).toBeInstanceOf( Map )

		} )

		
		it( 'optionally set `Expires`', () => {
			const expires	= Date.now() + 20 * 60 * 1000
			const cookie	= Cookie.parse( {
				Name	: 'cookiename',
				Expires	: expires,
			} )
	
			expect( cookie.get( 'Expires' ) )
				.toEqual( new Date( expires ) )
		} )

		
		it( 'optionally set `MaxAge`', () => {
			const expires	= Date.now() + 20 * 60 * 1000
			const cookie	= Cookie.parse( {
				Name	: 'cookiename',
				MaxAge	: expires,
			} )
	
			expect( cookie.get( 'MaxAge' ) )
				.toBe( expires )
		} )


		it( 'optionally set `Path`', () => {
			const cookie = Cookie.parse( {
				Name	: 'cookiename',
				Path	: '/specific-path',
			} )
	
			expect( cookie.get( 'Path' ) ).toBe( '/specific-path' )
		} )


		it( 'optionally set `Priority`', () => {
			const cookie = Cookie.parse( {
				Name	: 'cookiename',
				Priority: Priority.High,
			} )
	
			expect( cookie.get( 'Priority' ) ).toBe( Priority.High )
		} )


		it( 'optionally set `Domain`', () => {
			const cookie = Cookie.parse( {
				Name	: 'cookiename',
				Domain	: 'example.com',
			} )
	
			expect( cookie.get( 'Domain' ) ).toBe( 'example.com' )
		} )


		it( 'optionally set `HttpOnly`', () => {
			const cookie = Cookie.parse( {
				Name		: 'cookiename',
				HttpOnly	: true,
			} )
	
			expect( cookie.get( 'HttpOnly' ) ).toBe( true )
		} )


		it( 'optionally set `Secure`', () => {
			const cookie = Cookie.parse( {
				Name	: 'cookiename',
				Secure	: true,
			} )
	
			expect( cookie.get( 'Secure' ) ).toBe( true )
		} )


		it( 'optionally set `SameSite`', () => {
			const cookie = Cookie.parse( {
				Name	: 'cookiename',
				SameSite: SameSite.Lax,
			} )
	
			expect( cookie.get( 'SameSite' ) ).toBe( SameSite.Lax )
		} )


		it( 'optionally set `Partitioned`', () => {
			const cookie = Cookie.parse( {
				Name		: 'cookiename',
				Partitioned	: true,
			} )
	
			expect( cookie.get( 'Partitioned' ) ).toBe( true )
		} )

	} )


	describe( 'Cookie.toString()', () => {

		const cookie = Cookie.parse( {
			Name		: 'cookiename',
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

		const cookieString = Cookie.toString( cookie )

		it( 'correctly stringify a Cookie Map', () => {
			expect( cookieString.includes( `${ cookie.get( 'Name' ) }=${ JSON.stringify( cookie.get( 'Value' ) ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Expires=${ new Date( cookie.get( 'Expires' )! ).toUTCString() }` ) )
				.toBe( true )
			expect( cookieString.includes( `Max-Age=${ cookie.get( 'MaxAge' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Path=${ cookie.get( 'Path' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Priority=${ cookie.get( 'Priority' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Domain=${ cookie.get( 'Domain' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `HttpOnly=${ cookie.get( 'HttpOnly' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Secure=${ cookie.get( 'Secure' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `SameSite=${ cookie.get( 'SameSite' ) }` ) )
				.toBe( true )
			expect( cookieString.includes( `Partitioned=${ cookie.get( 'Partitioned' ) }` ) )
				.toBe( true )
		} )

	} )


	describe( 'Cookie.fromString()', () => {
		const expires = new Date( Date.now() + 20 * 60 * 1000 )
		expires.setMilliseconds( 0 ) // ms are excluded from `Date.toUTCString()` output.

		const cookie = Cookie.parse( {
			Name		: 'cookiename',
			Value		: { test: 'value' },
			Path		: '/specific-path',
			Priority	: Priority.High,
			Expires		: expires,
			Domain		: 'example.com',
			Secure		: true,
			HttpOnly	: true,
			SameSite	: SameSite.Lax,
			MaxAge		: Date.now() + 30 * 60 * 1000,
			Partitioned	: true,
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
					[ 'Name', 'cookiename' ],
					[ 'Value', 'value' ],
				] ) )
		} )
		

		it( 'skips parameters with nullish values', () => {
			expect( Cookie.fromString( 'cookiename=value;Expires=' ) )
				.toEqual( new Map( [
					[ 'Name', 'cookiename' ],
					[ 'Value', 'value' ],
				] ) )
		} )
		
		
		it( 'skips Expires parameter when invalid date is provided', () => {
			expect( Cookie.fromString( 'cookiename=value;Expires=Invalid Date' ) )
				.toEqual( new Map( [
					[ 'Name', 'cookiename' ],
					[ 'Value', 'value' ],
				] ) )
			
			expect( Cookie.fromString( 'cookiename=value;Expires=true' ) )
				.toEqual( new Map( [
					[ 'Name', 'cookiename' ],
					[ 'Value', 'value' ],
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
				Name		: CookieName.COOKIE_1,
				Value		: { test: 'value' },
				Path		: '/specific-path',
				Priority	: Priority.High,
				Expires		: expires,
				Domain		: 'example.com',
				Secure		: true,
				HttpOnly	: true,
				SameSite	: SameSite.Lax,
				MaxAge		: Date.now() + 30 * 60 * 1000,
				Partitioned	: true,
			} ),
			Cookie.parse<CookieName, Cookie2>( {
				Name		: CookieName.COOKIE_2,
				Value		: { test: true },
				Path		: '/specific-path',
				Priority	: Priority.High,
				Expires		: expires,
				Domain		: 'example.com',
				Secure		: true,
				HttpOnly	: true,
				SameSite	: SameSite.Lax,
				MaxAge		: Date.now() + 30 * 60 * 1000,
				Partitioned	: true,
			} ),
		]
		
		const cookies = Cookie.fromListString<CookiesMap>(
			cookiesList.map(
				cookie => Cookie.toString<CookieName, CookiesMap[ CookieName ]>( cookie )
			).join( '; ' )
		)

		it( 'returns a Map of Cookie Map indexed by Cookie Name', () => {
			expect ( cookies ).toBeInstanceOf( Map )

			expect( cookies.get( CookieName.COOKIE_1 )?.get( 'Value' )?.test )
				.toBe( 'value' )

			expect( cookies.get( CookieName.COOKIE_2 )?.get( 'Value' )?.test )
				.toBe( true )

		} )


		it( 'discards a wrong formatted cookie', () => {

			const cookies = Cookie.fromListString( '; cookiename=value;' )

			expect( cookies.size ).toBe( 1 )
			expect( cookies.get( 'cookiename' )?.get( 'Value' ) )
				.toBe( 'value' )

		} )

	} )


	describe( 'Cookie.set()', () => {

		it( 'returns false if document is undefined', () => {

			const result = Cookie.set( {
				Name	: 'testcookie',
				Value	: 'testvalue',
			} )
	
			expect( result ).toBe( false )

		} )

	} )

} )