import { deferTask, sleep } from '@/promises'

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


describe( 'deferTask', () => {

	it( 'defers task with setTimeout only if requestAnimationFrame is not defined', async () => {

		jest.useFakeTimers()

		const task			= jest.fn( () => 1 )
		const setTimeoutSpy	= jest.spyOn( global, 'setTimeout' )
		const promise		= deferTask( task )

		jest.runAllTimers()

		await expect( promise ).resolves.not.toThrow( new ReferenceError( 'requestAnimationFrame is not defined' ) )

		expect( setTimeoutSpy )
			.toHaveBeenCalledWith( expect.any( Function ), 0 )

		setTimeoutSpy.mockRestore()
		
		jest.useRealTimers()
	} )
	
} )