/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../lib/userContext'
import { useToast } from '@/components/ui/use-toast'

function Landing() {
	const { user, setUser } = useContext(UserContext)
	const { toast } = useToast()
	// console.log(user)
	const navigate = useNavigate()
	useEffect(() => {
		const getData = async () => {
			toast({
				title: 'Setting up...',
			})
			const apiUrl = import.meta.env.VITE_API_URL;
			console.log(user)
			try {
				const response = await axios.get(`${apiUrl}api/admins/validate`)
				console.log(response)
				sessionStorage.setItem('token', JSON.stringify(response.data.token))
				setUser(true) 
			} catch (error) {
				if (error.response.status === 401) {
					setUser(false)
					navigate('redirect')
				}
				console.log(error)
			}
		}
		const userSession = sessionStorage.getItem('token')
		if (!userSession) {
			getData()
		} else {
			setUser(true)
		}
	}, [])

	return (
		<div className='w-full h-full flex items-center justify-center text-center'>
			<div className='flex flex-col gap-4'>
				<h1 className='text-4xl font-serif my-4'>Dominion Chapel Admin Page</h1>
				<p className='text-lg'>Here you can modify the content of the Dominion Chapel</p>
				<p className='bg-red-400 font-semibold'>Be careful what you do here !!!!</p>
			</div>
		</div>
	)
}

export default Landing