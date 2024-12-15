import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
function Error() {
	return (
		<div className='text-white w-[100%] min-h-[70vh] flex flex-col justify-center items-center'>
			<h1 className='text-[7vh]'>404 Error</h1>
			<p className=''>Page does not exist</p>
			<Link to='/'><p className='border-b-2 border-white flex gap-3 justify-center items-center'>Redirect back to the HomePage <FaArrowRight/></p></Link>
		</div>
	)
}

export default Error