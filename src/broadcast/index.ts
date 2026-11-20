import { createLogger, type Logger, type LogLevel } from '@alessiofrittoli/console/logger'
import { randomUUID, type UUID } from '@alessiofrittoli/math-utils'

interface BroadcastChannelEventMap<EventAction> {
	message: MessageEvent<EventAction>
	messageerror: MessageEvent<EventAction>
}

type EventListener<
	EventAction extends object,
	K extends keyof BroadcastChannelEventMap<EventAction | SessionEventAction>,
> = (
	this: BroadcastChannel<EventAction>,
	event: BroadcastChannelEventMap<EventAction | SessionEventAction>[K],
) => unknown

interface EventListenerObject<
	EventAction extends object,
	K extends keyof BroadcastChannelEventMap<EventAction | SessionEventAction>,
> {
	handleEvent: (
		this: EventListenerObject<EventAction, K>,
		event: BroadcastChannelEventMap<EventAction | SessionEventAction>[K],
	) => unknown
}

type EventListenerOrEventListenerObject<
	EventAction extends object,
	K extends keyof BroadcastChannelEventMap<EventAction | SessionEventAction>,
> = EventListener<EventAction, K> | EventListenerObject<EventAction, K>

export type DispatchActionFromMap<TEventsMap extends object> = {
	[K in keyof TEventsMap]: TEventsMap[K] extends undefined
		? {
				type: K
			}
		: {
				type: K
				payload: TEventsMap[K]
			}
}[keyof TEventsMap]

export const SessionEvent = {
	Ping: 'ping',
	Pong: 'pong',
	Close: 'close',
} as const

export type SessionEvent = (typeof SessionEvent)[keyof typeof SessionEvent]

interface SessionEventMap {
	[SessionEvent.Ping]: [senderId: UUID]
	[SessionEvent.Pong]: [senderId: UUID]
	[SessionEvent.Close]: [senderId: UUID]
}

export type SessionEventAction = DispatchActionFromMap<SessionEventMap>

export interface BroadcastChannelOptions {
	/**
	 * Defines log level.
	 *
	 * @default 'error'
	 */
	logLevel?: LogLevel
}

export type OnMessageEventListener<EventAction extends object> = EventListener<EventAction, 'message'>

export type OnMessageErrorEventListener<EventAction extends object> = EventListener<
	EventAction,
	'messageerror'
>

/**
 * The **`BroadcastChannel`** interface represents a named channel that any browsing context of a given origin can subscribe to.
 * It allows communication between different documents (in different windows, tabs, frames or iframes) of the same origin.
 *
 * Messages are broadcasted via a message event fired at all BroadcastChannel objects listening to the channel, except the object that sent the message.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel)
 */
export class BroadcastChannel<
	EventAction extends object = object,
	CombinedEventAction = EventAction | SessionEventAction,
>
	extends globalThis.BroadcastChannel
{
	/**
	 * Logger used by this channel instance.
	 *
	 */
	private readonly logger: Logger
	/**
	 * Unique identifier for this browsing context's channel instance.
	 *
	 */
	public readonly tabId: UUID = randomUUID()
	/**
	 * Tab identifiers discovered in the channel, including this tab.
	 *
	 */
	public readonly tabs: Set<UUID> = new Set([this.tabId])

	private pingPongListenersRegistered = false

	/**
	 * Creates a channel with the given name and starts listening for session events.
	 *
	 * @param name - Name shared by channel instances that should communicate.
	 * @param options - Optional channel configuration.
	 */
	public constructor(name: string, options: BroadcastChannelOptions = {}) {
		super(name)

		const { logLevel = 'error' } = options

		this.logger = createLogger({ module: 'BroadcastChannel' }, logLevel)

		this.registerPinPongEventListeners()
	}

	/**
	 * Closes the channel and removes its internal session listeners.
	 *
	 */
	public destroy(): this {
		this.close()
		this.tabs.delete(this.tabId)

		this.unregisterPinPongEventListeners()

		this.logger.debug('BroadcastChannel destroyed.')

		return this
	}

	/**
	 * The **`postMessage()`** method of the BroadcastChannel interface sends a message, which can be of any kind of Object, to each listener in any browsing context with the same origin. The message is transmitted as a message event targeted at each BroadcastChannel bound to the channel.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/BroadcastChannel/postMessage)
	 */
	public override postMessage(message: CombinedEventAction): this {
		super.postMessage(message)

		this.logger.debug({ senderId: this.tabId, message }, 'post-message sent.')

		return this
	}

	private sendSessionPostMessage(message: SessionEventAction): this {
		return this.postMessage(message as CombinedEventAction)
	}

	public override addEventListener<K extends keyof BroadcastChannelEventMap<CombinedEventAction>>(
		type: K,
		listener: EventListenerOrEventListenerObject<EventAction, K>,
		options?: boolean | AddEventListenerOptions,
	): this
	public override addEventListener<K extends keyof BroadcastChannelEventMap<CombinedEventAction>>(
		type: K,
		listener: EventListener<EventAction, K>,
		options?: boolean | AddEventListenerOptions,
	): this
	public override addEventListener(
		...args: Parameters<globalThis.BroadcastChannel['addEventListener']>
	): this {
		super.addEventListener(...args)

		return this
	}

	public override removeEventListener<K extends keyof BroadcastChannelEventMap<CombinedEventAction>>(
		type: K,
		listener: EventListenerOrEventListenerObject<EventAction, K>,
		options?: boolean | AddEventListenerOptions,
	): this
	public override removeEventListener<K extends keyof BroadcastChannelEventMap<CombinedEventAction>>(
		type: K,
		listener: EventListener<EventAction, K>,
		options?: boolean | EventListenerOptions,
	): void
	public override removeEventListener(
		...args: Parameters<globalThis.BroadcastChannel['removeEventListener']>
	): this {
		super.removeEventListener(...args)

		return this
	}

	/**
	 * Discovers channel instances that respond to a ping and returns their identifiers.
	 * The returned set is the instance's live `tabs` set and includes this tab.
	 */
	public async getActiveTabs(): Promise<typeof this.tabs> {
		this.registerPinPongEventListeners()

		this.tabs.clear()
		this.tabs.add(this.tabId)

		this.sendSessionPostMessage({ type: SessionEvent.Ping, payload: [this.tabId] })

		await new Promise(resolve => setTimeout(resolve, 10))

		return this.tabs
	}

	//#region ping-pong events

	private registerPinPongEventListeners(): void {
		if (typeof window === 'undefined' || this.pingPongListenersRegistered) {
			return
		}

		super.addEventListener('message', this.onPingPongMessage)
		window.addEventListener('pagehide', this.onWindowClose, { once: true })

		this.pingPongListenersRegistered = true

		this.logger.debug('Ping-Pong event listeners registered.')
	}

	private unregisterPinPongEventListeners(): void {
		if (typeof window === 'undefined') {
			return
		}

		super.removeEventListener('message', this.onPingPongMessage)
		window.removeEventListener('pagehide', this.onWindowClose)

		this.pingPongListenersRegistered = false

		this.logger.debug('Ping-Pong event listeners removed.')
	}

	private onWindowClose = (): void => {
		this.sendSessionPostMessage({ type: SessionEvent.Close, payload: [this.tabId] })
		this.close()
	}

	private onPingPongMessage = (event: MessageEvent<SessionEventAction>): void => {
		const { type } = event.data

		if (!Object.values(SessionEvent).includes(type)) {
			return
		}

		const {
			payload: [senderId],
		} = event.data

		this.logger.debug({ type, senderId, currentTabId: this.tabId }, 'Ping-Pong message received.')

		if (!senderId || senderId === this.tabId) return

		switch (type) {
			case SessionEvent.Ping:
				this.tabs.add(senderId)
				this.sendSessionPostMessage({ type: SessionEvent.Pong, payload: [this.tabId] })
				break
			case SessionEvent.Pong:
				this.tabs.add(senderId)
				break
			case SessionEvent.Close:
				this.tabs.delete(senderId)
				break
		}
	}

	//#endregion
}
