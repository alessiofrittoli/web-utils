/**
 * @jest-environment jsdom
 */
import { deferCallback, deferTask } from '@/promises'


describe( 'deferTask', () => {

	let rafSpy: jest.SpyInstance<number, [ FrameRequestCallback ]>

	beforeEach( () => {

		jest.useFakeTimers()
		rafSpy = (
			jest.spyOn( window, 'requestAnimationFrame' )
				.mockImplementation( cb => {
					cb( performance.now() )
					return 1
				} )
		)

	} )


	afterEach( () => {

		rafSpy.mockRestore()
		jest.useRealTimers()

	} )


	it( 'resolves with the result of a synchronous task', async () => {

		const task		= jest.fn( () => 42 )
		const promise	= deferTask( task )

		jest.runAllTimers()
		
		await expect( promise ).resolves.toBe( 42 )
		
		expect( task ).toHaveBeenCalled()

	} )
	

	it( 'resolves with the result of an asynchronous task', async () => {

		const task		= jest.fn( async () => 'async result' )
		const promise	= deferTask( task )

		jest.runAllTimers()

		await expect( promise ).resolves.toBe( 'async result' )
		expect( task ).toHaveBeenCalled()

	} )


	it( 'rejects if the task throws synchronously', async () => {

		const error		= new Error( 'fail' )
		const task		= jest.fn( () => { throw error } )
		const promise	= deferTask( task )

		jest.runAllTimers()

		await expect( promise ).rejects.toBe( error )
		expect( task ).toHaveBeenCalled()

	} )


	it( 'rejects if the task returns a rejected promise', async () => {

		const error		= new Error( 'async fail' )
		const task		= jest.fn( async () => { throw error })
		const promise	= deferTask( task )

		jest.runAllTimers()

		await expect( promise ).rejects.toBe( error )
		expect( task ).toHaveBeenCalled()

	} )


	it( 'defers task with requestAnimationFrame and setTimeout', async () => {

		const task			= jest.fn( () => 1 )
		const setTimeoutSpy	= jest.spyOn( window, 'setTimeout' )
		const promise		= deferTask( task )

		jest.runAllTimers()

		await promise

		expect( rafSpy ).toHaveBeenCalled()
		expect( setTimeoutSpy ).toHaveBeenCalledWith( expect.any( Function ), 0 )

		setTimeoutSpy.mockRestore()

	} )


	it( 'proxies given arguments to the given task function', async () => {

		const task = jest.fn( ( input: number ) => input + 1 )

		const result = deferTask( task, 10 )

		jest.runAllTimers()

		await expect( result ).resolves.toBe( 11 )

	} )


	describe( 'deferCallback', () => {
		
		it( 'returns a callback which proxies task arguments', async () => {

			type Handler	= ( input: number ) => number
			const task		= ( input: number ) => input + 1
			const result	= deferCallback<Handler, Parameters<Handler>>( task )( 10 )

			jest.runAllTimers()

			await expect( result ).resolves.toBe( 11 )

		} )
	
	} )


} )

