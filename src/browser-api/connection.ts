/**
 * The `NetworkInformation` interface of the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
 * provides information about the connection a device is using to
 * communicate with the network and provides a means for scripts to be notified if the connection type changes.
 * 
 * The `NetworkInformation` interface cannot be instantiated.
 * It is instead accessed through the `connection` property of the [`Navigator`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
 * interface or the [`WorkerNavigator`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator) interface.
 * 
 * ⚠️ Will be replaced by official [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) interface.
 * 
 * ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)
 * 
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
 */
export interface NetworkInformation extends EventTarget
{
	/**
	 * Returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds.
	 * 
	 * ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlink#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlink)
	 */
	readonly downlink: number
	/**
	 * Returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.
	 * 
	 * ⚠️ Experimental - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlinkMax#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlinkMax)
	 */
	readonly downlinkMax?: number
	/**
	 * Returns the effective type of the connection.
	 * This value is determined using a combination of recently observed round-trip time and downlink values.
	 * 
	 * ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)
	 */
	readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
	/**
	 * Returns the estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
	 * 
	 * ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/rtt#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/rtt)
	 */
	readonly rtt: number
	/**
	 * Returns `true` if the user has set a reduced data usage option on the user agent.
	 * 
	 * ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)
	 */
	readonly saveData: boolean
	/**
	 * Returns the type of connection a device is using to communicate with the network.
	 * 
	 * ⚠️ Experimental - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/type#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/type)
	 */
	readonly type?: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'
}

/**
 * Defiens network status and `NetworkInformation`.
 * 
 */
export interface Connection
{
	/**
	 * The `NetworkInformation` interface of the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
	 * provides information about the connection a device is using to
	 * communicate with the network and provides a means for scripts to be notified if the connection type changes.
	 * 
	 * The `NetworkInformation` interface cannot be instantiated.
	 * It is instead accessed through the `connection` property of the [`Navigator`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
	 * interface or the [`WorkerNavigator`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator) interface.
	 * 
	 * ⚠️ Will be replaced by official [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) interface.
	 * 
	 * ⚠️ Limited availability - [See full compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
	 */
	readonly network?: NetworkInformation
	/**
	 * Indicates whether the device is connected to the network.
	 * 
	 * - See [Listening for changes in network status](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine#listening_for_changes_in_network_status).
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)
	 */
	readonly onLine: boolean
}


/**
 * Get current Network status and information.
 * 
 * @returns An object defining network status and `NetworkInformation`. See {@link Connection} for more info.
 */
export const getConnection = (): Connection => {
	
	const { onLine } = navigator

	if ( 'connection' in navigator ) {
		return {
			onLine, network: navigator.connection as NetworkInformation | undefined,
		}
	}

	return { onLine }

}