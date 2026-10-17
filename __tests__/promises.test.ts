import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deferTask, sleep } from '@/promises'

describe('promises', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.clearAllTimers().useRealTimers()
	})

	describe('sleep', () => {
		it('resolves a Promise after the specified time', async () => {
			const ms = 1000
			const promise = sleep(ms)

			// Fast-forward
			vi.advanceTimersByTime(ms / 2)

			let resolved = false
			promise.then(() => {
				resolved = true
			})
			expect(resolved).toBe(false)

			// Fast-forward
			vi.advanceTimersByTime(ms / 2)

			await expect(promise).resolves.toBeUndefined()
		})
	})

	describe('deferTask', () => {
		it('defers task with setTimeout only if requestAnimationFrame is not defined', async () => {
			const task = vi.fn(() => 1)
			const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
			const promise = deferTask(task)

			vi.runAllTimers()

			await expect(promise).resolves.not.toThrow(
				new ReferenceError('requestAnimationFrame is not defined'),
			)

			expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 0)

			setTimeoutSpy.mockRestore()
		})
	})
})
