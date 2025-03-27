import { sleep } from '@/promises'

describe( 'sleep', () => {

	jest.useFakeTimers()

	afterAll( () => {
		jest.useRealTimers()
	} )

	it( 'resolves a Promise after the specified time', () => {

		const ms		= 1000
		const promise	= sleep( ms )

		// Fast-forward
		jest.advanceTimersByTime( ms / 2 )

		let resolved = false
		promise.then( () => {
			resolved = true
		} )
		expect( resolved ).toBe( false )
		
		// Fast-forward
		jest.advanceTimersByTime( ms / 2 )

		expect( promise ).resolves.toBeUndefined()

	} )

} )