import type { Logger, LogLevel } from '@alessiofrittoli/console/logger'
import { createLogger } from '@alessiofrittoli/console/logger'

/**
 * Several options that can be passed when requesting a lock.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API#options)
 */
export interface LockOptions extends globalThis.LockOptions {
	/**
	 * Automatically release the [Lock](https://developer.mozilla.org/en-US/docs/Web/API/Lock) when the current window get closed.
	 *
	 * @default false
	 */
	releaseOnPageClose?: boolean
}

/**
 * LockManager instance options.
 *
 */
export interface LockManagerOptions {
	/**
	 * Defines log level.
	 *
	 * @default 'error'
	 */
	logLevel?: LogLevel
}

export class LockManager {
	/**
	 * The LockManager Logger.
	 *
	 */
	private readonly logger: Logger

	/**
	 * The callback that resolves the lock Promise.
	 *
	 */
	private releaseLock?: () => void

	public constructor(options: LockManagerOptions = {}) {
		const { logLevel = 'error' } = options

		this.logger = createLogger({ module: 'LockManager' }, logLevel)
	}

	/**
	 * The **`query()`** method of the LockManager interface returns a Promise that resolves with an object containing information about held and pending locks.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/LockManager/query)
	 */
	public query(): Promise<LockManagerSnapshot> {
		return navigator.locks.query()
	}

	/**
	 * The **`request()`** method of the LockManager interface requests a Lock object with parameters specifying its name and characteristics. The requested Lock is passed to a callback, while the function itself returns a Promise that resolves (or rejects) with the result of the callback after the lock is released, or rejects if the request is aborted.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/LockManager/request)
	 */
	public request<T>(
		name: string,
		options: LockOptions,
		callback: LockGrantedCallback<T>,
	): Promise<Awaited<T>>
	/**
	 * The **`request()`** method of the LockManager interface requests a Lock object with parameters specifying its name and characteristics. The requested Lock is passed to a callback, while the function itself returns a Promise that resolves (or rejects) with the result of the callback after the lock is released, or rejects if the request is aborted.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/LockManager/request)
	 */
	public request<T>(name: string, callback: LockGrantedCallback<T>): Promise<Awaited<T>>
	/**
	 * The **`request()`** method of the LockManager interface requests a Lock object with parameters specifying its name and characteristics. The requested Lock is passed to a callback, while the function itself returns a Promise that resolves (or rejects) with the result of the callback after the lock is released, or rejects if the request is aborted.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/LockManager/request)
	 */
	public request<T>(
		name: string,
		callbackOrOptions: LockGrantedCallback<T> | LockOptions,
		callback?: LockGrantedCallback<T>,
	): Promise<Awaited<T>> {
		const requestOptions = typeof callbackOrOptions === 'function' ? {} : callbackOrOptions
		const requestGrantedCallback = typeof callbackOrOptions === 'function' ? callbackOrOptions : callback!

		const { releaseOnPageClose = false } = requestOptions

		return navigator.locks.request(name, requestOptions, async lock => {
			const lockPromise = new Promise<void>(resolve => {
				this.releaseLock = resolve

				if (releaseOnPageClose) {
					window.addEventListener('pagehide', () => resolve(), { once: true })
				}
			})

			this.logger.debug({ lock }, 'Lock request granted.')

			const resultPromise = requestGrantedCallback(lock)

			await lockPromise

			const result = await resultPromise

			this.logger.debug({ lock }, 'Lock released.')

			return result
		})
	}

	/**
	 * Release the current lock if any.
	 *
	 * @returns The current `LockManager` instance for chaining purposes.
	 */
	public release(): this {
		this.releaseLock?.()
		return this
	}
}
