/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"

function About() {
	const { toast } = useToast()
	const [data, setData] = useState(null)
	const [welcome, setWelcome] = useState('')
	const [vision, setVision] = useState('')
	const [about, setAbout] = useState('')

	const apiUrl = import.meta.env.VITE_API_URL;
	const home = import.meta.VITE_HOME

	const edit = async (name, value)=>{
		const data = {name, value}
		// console.log(data)
		const token = sessionStorage.getItem('token')
		try{
				const response = await axios.patch(`${apiUrl}api/about/update`,
						{
							headers: {
								Authorization: token
							}, data
						}
					) 
					console.log(response)
				getAbout()
				toast({
					title: 'Success',
					variant: 'success'
				})
			}catch(err){
				console.log(err)
				if(err.response?.status === 401){
					setTimeout(()=>{
							sessionStorage.clear()
						window.location.replace(home);
					}, 3000)
					toast({
						title: 'Unauthorized: You are being logged out',
						variant: 'destructive'
					})
				} else{
					toast({
						title: 'Failed to fetch data, check your connection',
						variant: 'destructive'
					})
				} 
			}
	}
	const getAbout= async ()=>{
			try{
				const response = await axios.get(`${apiUrl}api/about`)
				const data = response.data.data[0]
				// console.log(response)
				// console.log(data)
				setData({
					about: data.about,
					vision: data.vision,
					welcome: data.welcome
				})
				if(response.status === 200){
					toast({
						title: 'Success',
						variant: 'success'
					})
				}
			}catch(err){
				console.log(err)
				if(err.response?.status === 401){
					setTimeout(()=>{
							sessionStorage.clear()
						window.location.replace(home);
					}, 3000)
					toast({
						title: 'Unauthorized: You are being logged out',
						variant: 'destructive'
					})
				} else{
					toast({
						title: 'Failed to fetch data, check your connection',
						variant: 'destructive'
					})
				}
			}
		}
		const handleVision= (e)=>{
			setVision(e.target.value)
			// console.log(vision)
		}
		const handleWelcome= (e)=>{
			setWelcome(e.target.value)
			// console.log(welcome)
		}
		const handleAbout= (e)=>{
			setAbout(e.target.value)
			// console.log(e)
		}

	useEffect(() => {
		getAbout()
	}, [])
	return (
		<div className=' flex justify-evenly flex-wrap gap-4 pt-8'>
			<div>
				<Card className="md:w-[350px] bg-[#DDE6ED] h-full flex flex-col items-center justify-between" >
			      <div className='w-full'>
					<CardHeader className='w-full'>
						<CardTitle>Wecome Message</CardTitle>
						<CardDescription>Edit Wecome Message.</CardDescription>
					</CardHeader>
					<CardContent>
					<CardDescription className='my-2 rounded-md bg-gray-400 p-2 text-white'>{data && data.welcome}</CardDescription>
						<form>
							<textarea value={welcome} className='p-2 w-full min-h-20' placeholder='Message ....' onChange={handleWelcome}>
								
							</textarea>
						</form>
					</CardContent>
				  </div>
			      <CardFooter className="flex justify-between w-full">
			        <Button onClick={()=> setWelcome('')} variant="outline">Clear</Button>
			        <Button onClick={()=>edit('welcome', welcome)}>Save</Button>
			      </CardFooter>
			    </Card>
			</div>

			<div>
				<Card className="md:w-[350px] bg-[#DDE6ED] h-full flex flex-col items-center justify-between">
			      <div className='w-full'>
					<CardHeader className='w-full'>
						<CardTitle>Vision</CardTitle>
						<CardDescription>Edit Vision.</CardDescription>
					</CardHeader>
					<CardContent>
					<CardDescription className='my-2 rounded-md bg-gray-400 p-2 text-white'>{data && data.vision}</CardDescription>
						<form>
							<textarea value={vision} className='p-2 w-full min-h-20' placeholder='Message ....' onChange={handleVision}>
								
							</textarea>
						</form>
					</CardContent>
				  </div>
			      <CardFooter className="flex justify-between w-full">
			        <Button onClick={()=> setVision('')} variant="outline">Clear</Button>
			        <Button onClick={()=>edit('vision', vision)}>Save</Button>
			      </CardFooter>
			    </Card>
			</div>

			{/* <div> */}
			{/* 	<Card className="w-[350px] bg-[#DDE6ED]"> */}
			{/*       <CardHeader> */}
			{/*         <CardTitle>Days of Service</CardTitle> */}
			{/*         <CardDescription>Edit Days of service.</CardDescription> */}
			{/*       </CardHeader> */}
			{/*       <CardContent> */}
			{/*         <form> */}
			{/* 			<textarea className='p-2 w-full min-h-20'> */}
			{/* 				 */}
			{/* 			</textarea> */}
			{/*         </form> */}
			{/*       </CardContent> */}
			{/*       <CardFooter className="flex justify-between"> */}
			{/*         <Button variant="outline">Clear</Button> */}
			{/*         <Button>Save</Button> */}
			{/*       </CardFooter> */}
			{/*     </Card> */}
			{/* </div> */}

			<div>
				<Card className="md:w-[350px] bg-[#DDE6ED] h-full flex flex-col items-center justify-between">
			      <div className='w-full'>
					<CardHeader className='w-full'>
						<CardTitle>About Us</CardTitle>
						<CardDescription>Edit content.</CardDescription>
					</CardHeader>
					<CardContent>
					<CardDescription className='my-2 rounded-md bg-gray-400 p-2 text-white'>{data && data.about}</CardDescription>
						<form>
								<textarea value={about} className='p-2 w-full min-h-20' placeholder='Message ....' onChange={handleAbout}>
									
								</textarea>
						</form>
					</CardContent>
				  </div>
			      <CardFooter className="flex justify-between w-full">
			        <Button onClick={()=> setAbout('')} variant="outline">Clear</Button>
			        <Button onClick={()=>edit('about', about)}>Save</Button>
			      </CardFooter>
			    </Card>
			</div>
		</div>
	)
}

export default About