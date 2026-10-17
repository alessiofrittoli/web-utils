/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { deferCallback, deferTask } from '@/promises'

describe('deferTask', () => {
	let rafSpy: Mock<typeof requestAnimationFrame>

	beforeEach(() => {
		vi.useFakeTimers()

		rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
			cb(performance.now())
			return 1
		})
	})

	afterEach(() => {
		rafSpy.mockRestore()
		vi.clearAllTimers().useRealTimers()
	})

	it('resolves with the result of a synchronous task', async () => {
		const task = vi.fn(() => 42)
		const promise = deferTask(task)

		vi.runAllTimers()

		await expect(promise).resolves.toBe(42)

		expect(task).toHaveBeenCalled()
	})

	it('resolves with the result of an asynchronous task', async () => {
		const task = vi.fn(async () => 'async result')
		const promise = deferTask(task)

		vi.runAllTimers()

		await expect(promise).resolves.toBe('async result')
		expect(task).toHaveBeenCalled()
	})

	it('rejects if the task throws synchronously', async () => {
		const error = new Error('fail')
		const task = vi.fn(() => {
			throw error
		})
		const promise = deferTask(task)

		vi.runAllTimers()

		await expect(promise).rejects.toBe(error)
		expect(task).toHaveBeenCalled()
	})

	it('rejects if the task returns a rejected promise', async () => {
		const error = new Error('async fail')
		const task = vi.fn(async () => {
			throw error
		})
		const promise = deferTask(task)

		vi.runAllTimers()

		await expect(promise).rejects.toBe(error)
		expect(task).toHaveBeenCalled()
	})

	it('defers task with requestAnimationFrame and setTimeout', async () => {
		const task = vi.fn(() => 1)
		const setTimeoutSpy = vi.spyOn(window, 'setTimeout')
		const promise = deferTask(task)

		vi.runAllTimers()

		await promise

		expect(rafSpy).toHaveBeenCalled()
		expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 0)

		setTimeoutSpy.mockRestore()
	})

	it('proxies given arguments to the given task function', async () => {
		const task = vi.fn((input: number) => input + 1)

		const result = deferTask(task, 10)

		vi.runAllTimers()

		await expect(result).resolves.toBe(11)
	})

	describe('deferCallback', () => {
		it('returns a callback which proxies task arguments', async () => {
			type Handler = (input: number) => number
			const task = (input: number): number => input + 1
			const result = deferCallback<Handler, Parameters<Handler>>(task)(10)

			vi.runAllTimers()

			await expect(result).resolves.toBe(11)
		})
	})
})
