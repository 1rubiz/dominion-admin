import React, { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../lib/userContext'
// 27374D
// 526D82
// 9DB2BF
// DDE6ED

function Nav({mobile, handleMobile}) {
	const url = import.meta.env.VITE_HOME;
	const { user, setUser } = useContext(UserContext)
	const location = useLocation()
	const path = location.pathname;
	// const [mobile, setMobile] = useState(false)
	// console.log(path)
	const logout = ()=>{
		// try{
		// 	const response 
		// }catch(error){
		// 	console.log(error)
		// }
		sessionStorage.clear()
		window.location.replace(url);

	}
	const link = 'px-2 py-1 transition ease-in-out delay-150 duration-200 hover:bg-[#DDE6ED] rounded-sm hover:text-[#27374D]'
	return (
		<div className={`${mobile && 'hidden'} absolute top-0 left-0 z-10 h-screen md:relative w-[50%] md:w-full md:h-[94svh] bg-[#27374D] rounded-md text-center text-white flex flex-col justify-between py-2`}>
			<div>
				<h1 className='text-[4vh] font-serif pt-8'>
					Dominion chapel
				</h1>

				<div className='text-left font-serif px-8 my-4'>
					<ul className='hidden md:flex flex-col gap-2 text-base'>
						<Link to='/'><li className={`${link} ${(path === '/') && 'bg-blue-400'}`}>Home</li><hr/></Link>
						{
							user && (
								<>
									<Link to='/carousel'><li className={`${link} ${(path === '/carousel') && 'bg-blue-400'}`}>Carousel</li><hr/></Link>
									<Link to='/about'><li className={`${link} ${(path === '/about') && 'bg-blue-400'}`}>About</li><hr/></Link>
									<Link to='/gallery'><li className={`${link} ${(path === '/gallery') && 'bg-blue-400'}`}>Gallery</li><hr/></Link>
									<Link to='/account'><li className={`${link} ${(path === '/account') && 'bg-blue-400'}`}>Payment</li><hr/></Link>
									<Link to='/admins'><li className={`${link} ${(path === '/admins') && 'bg-blue-400'}`}>Admins</li><hr/></Link>
								</>
								)
						}
					</ul>
					<ul className='flex flex-col md:hidden gap-2 text-base'>
						<Link to='/'><li onClick={handleMobile} className={`${link} ${(path === '/') && 'bg-blue-400'}`}>Home</li><hr/></Link>
						{
							user && (
								<>
									<Link to='/carousel'><li onClick={handleMobile} className={`${link} ${(path === '/carousel') && 'bg-blue-400'}`}>Carousel</li><hr/></Link>
									<Link to='/about'><li onClick={handleMobile} className={`${link} ${(path === '/about') && 'bg-blue-400'}`}>About</li><hr/></Link>
									<Link to='/gallery'><li onClick={handleMobile} className={`${link} ${(path === '/gallery') && 'bg-blue-400'}`}>Gallery</li><hr/></Link>
									<Link to='/account'><li onClick={handleMobile} className={`${link} ${(path === '/account') && 'bg-blue-400'}`}>Payment</li><hr/></Link>
									<Link to='/admins'><li onClick={handleMobile} className={`${link} ${(path === '/admins') && 'bg-blue-400'}`}>Admins</li><hr/></Link>
								</>
								)
						}
					</ul>
				</div>
			</div>
			<div className='w-full'>
				<Button variant='destructive' onClick={logout}>Log Out</Button>
			</div>
		</div>
	)
}

export default Nav