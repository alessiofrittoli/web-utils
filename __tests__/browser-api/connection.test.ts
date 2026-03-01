/**
 * @jest-environment jsdom
 */

import { getConnection, type NetworkInformation } from '@/browser-api/connection'


describe( 'getConnection', () => {
	
	it( 'returns onLine status', () => {

		expect( getConnection().onLine ).toBe( true )

	} )

	
	it( 'returns undefined network if NetworkInformation API is not available', () => {

		expect( getConnection().network ).toBeUndefined()
				
	} )


	it( 'returns NetworkInformation if available', () => {

		const network: NetworkInformation = {
			addEventListener	: jest.fn(),
			removeEventListener	: jest.fn(),
			dispatchEvent		: jest.fn(),
			downlink			: 40,
			effectiveType		: '4g',
			rtt					: 0,
			saveData			: false,
		}


		Object.defineProperty( navigator, 'connection', {
			configurable	: true,
			value			: network,
		} )


		expect( getConnection().network ).toBe( network )


		Object.defineProperty( navigator, 'connection', {
			configurable	: true,
			value			: undefined,
		} )

	} )

} )