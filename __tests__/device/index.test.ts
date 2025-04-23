import { getMediaMatches as WindowGetMediaMatches } from '@/browser-api'
import { isPortrait, portraitMediaQuery } from '@/device'


jest.mock( '@/browser-api', () => ( {
	getMediaMatches: jest.fn(),
} ) )

const getMediaMatches = WindowGetMediaMatches as jest.Mock


describe( 'isPortrait', () => {

	const originalWindow = global.window

	beforeEach( () => {
		// Reset any mocks before each test
		jest.resetAllMocks()
	} )

	afterEach( () => {
		global.window = originalWindow
		jest.resetAllMocks().resetModules()
	} )


	it( 'should return true when the device is in portrait orientation', () => {

		getMediaMatches.mockReturnValue( true )

		const result = isPortrait()

		expect( getMediaMatches ).toHaveBeenCalledWith( portraitMediaQuery )
		expect( result ).toBe( true )

	} )


	it( 'should return false when the device is not in portrait orientation', () => {

		getMediaMatches.mockReturnValue( false )

		const result = isPortrait()

		expect( getMediaMatches ).toHaveBeenCalledWith( portraitMediaQuery )
		expect( result ).toBe( false )

	} )

} )