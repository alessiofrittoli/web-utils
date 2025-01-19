/**
 * @jest-environment jsdom
 */
import { downloadBlob } from '@/blob'


describe( 'downloadBlob', () => {
	
	const originalCreateElement = document.createElement
	const linkClick				= jest.fn()
	const linkRemove			= jest.fn()
	const linkHrefSetter		= jest.fn( ( value ) => value )
	const linkDownloadSetter	= jest.fn( ( value ) => value )

	beforeEach( () => {
		global.URL.createObjectURL = jest.fn( () => 'mock-url' )
		global.URL.revokeObjectURL = jest.fn()
		document.createElement = jest.fn( () => ( {
			click		: linkClick,
			remove		: linkRemove,
			_href		: '',
			_download	: '',
			set href( value ) {
				this._href = linkHrefSetter( value )
			},
			get href() {
				return this._href
			},
			set download( value ) {
				this._download = linkDownloadSetter( value )
			},
			get download() {
				return this._download
			},
		} ) ) as unknown as typeof document.createElement
	} )

	afterEach( () => {
		jest.resetAllMocks()
		document.createElement = originalCreateElement
	} )

	it( 'creates a Blob and trigger a download', async () => {

		const filename	= 'test.txt'
		const data		= 'Hello, world!'

		await downloadBlob( filename, data )

		expect( URL.createObjectURL ).toHaveBeenCalled()
		expect( document.createElement ).toHaveBeenCalledWith( 'a' )
		expect( linkHrefSetter ).toHaveBeenCalledWith( 'mock-url' )
		expect( linkDownloadSetter ).toHaveBeenCalledWith( filename )
		expect( linkClick ).toHaveBeenCalled()
		expect( URL.revokeObjectURL ).toHaveBeenCalledWith( 'mock-url' )
		expect( linkRemove ).toHaveBeenCalled()
	} )

} )
