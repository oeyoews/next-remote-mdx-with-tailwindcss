import React from 'react'
import Image from 'next/image'

function Gravatar() {
	return (
		<Image src="/avatar.png" alt="author" width={18} height={18} className="rounded-full inline-block p-0 my-0 mx-1 align-middle" title="oeyoews" />
	)
}

export default Gravatar