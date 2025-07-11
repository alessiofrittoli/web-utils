import { getMediaMatches } from '@/browser-api/media-queries'


describe( 'getMediaMatches', () => {

	it( 'returns false if window is undefined', () => {

		expect( getMediaMatches( '(max-width: 600px)' ) ).toBe( false )

	} )

} )