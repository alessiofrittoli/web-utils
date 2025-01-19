/**
 * Create and download a blob object.
 * 
 * @param	filename	The download file name.
 * @param	data		The download file data.
 * @param	init		( Optional ) The ResponseInit object.
 */
export const downloadBlob = async ( filename: string, data: BodyInit, init?: ResponseInit ) => {
	const res		= new Response( data, init )
	const blob		= await res.blob()
	const link		= document.createElement( 'a' )
	link.href		= URL.createObjectURL( blob )
	link.download	= filename
	
	link.click()
	URL.revokeObjectURL( link.href )
	link.remove()
}