/* eslint-disable no-mixed-spaces-and-tabs */
// import * as React from "react"
import {
	Card,
	CardContent,
	//   CardDescription,
	CardFooter,
	//   CardHeader,
	//   CardTitle,
} from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
// import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
function Carousel() {
	const { toast } = useToast()
	const apiUrl = import.meta.env.VITE_API_URL;
	const token = sessionStorage.getItem('token')
	const [files, setFiles] = useState([]);
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [data, setData] = useState(null);

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};
	// const data = [
	// 	'/img.JPG',
	// 	'/img2.JPG',
	// 	'/logo.png',
	// 	'/vite.svg'
	// 	]
	const handleSubmit = async (e) => {
		e.preventDefault();
		toast({
			title: 'Loading...',
		})
		if (!files) {
			toast({
				title: 'Select files for upload',
				variant: 'destructive'
			})
		}
		const formData = new FormData();
		
		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i]);
		}

		try {
			const response = await axios.post(`${apiUrl}api/carousel/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token
				},
			});
			toast({
				title: response.data.message,
				variant: 'success'
			})
			getData()
			wait().then(() => setOpen(false));
		} catch (error) {
			if (error.response?.status === 401) {
				setTimeout(() => {
					sessionStorage.clear()
					// window.location.replace(home);
				}, 3000)
				toast({
					title: 'Unauthorized: You are being logged out',
					variant: 'destructive'
				})
			} else {
				toast({
					title: 'Failed to fetch data, check your connection',
					variant: 'destructive'
				})
			} 
		}
	};

	const getData = async () => {
		// console.log('fetching')
		toast({
			title: 'Loading...',
		})
		const token = sessionStorage.getItem('token')
		try {
			const response = await axios.get(`${apiUrl}api/carousel`,
				{
					headers: {
						Authorization: token
					}
				}
			)
			toast({
				title: response.data.message,
				variant: 'success'
			})
			console.log(response)
			// console.log(response.data.data[0].carousel)
			setData(response.data.data)
		} catch (err) {
			console.log(err)
			if (err.response?.status === 401) {
				setTimeout(() => {
					console.log('reroute')
					// sessionStorage.clear()
					// window.location.replace(home);
				}, 3000)
				toast({
					title: 'Unauthorized: You are being logged out',
					variant: 'destructive'
				})
			} else {
				toast({
					title: 'Failed to fetch data, check your connection',
					variant: 'destructive'
				})
			}
		}
	}

	const deleteItem = async (url, id, url_id) => {
		// console.log(url)
		// wait().then(() => setDeleteId(false));
		toast({
			title: 'Loading...',
		})
		const imageUrls = [url]
		const data = { imageUrls, id, url_id, token }
		console.log(data)
		try {
			const response = await axios.patch(`${apiUrl}api/carousel/delete`,
				{
					headers: {
						Authorization: token
					}, data
				});
			toast({
				title: response.data.message,
				variant: 'success'
			})
			getData()
			wait().then(() => setDeleteOpen(false));
		} catch (err) {
			console.log(err)
			if (err.response?.status === 401) {
				setTimeout(() => {
					sessionStorage.clear()
					// window.location.replace(home);
				}, 3000)
				toast({
					title: 'Unauthorized: You are being logged out',
					variant: 'destructive'
				})
			} else {
				toast({
					title: 'Failed to fetch data, check your connection',
					variant: 'destructive'
				})
			}
		}
	}
	
	useEffect(() => {
		getData()	
	}, [])
	const [currentImg, setCurrentImg] = useState(null)
	const setDisplay = (value) => {
		setCurrentImg(value)
	}
	return (
		<div>
			
			<div className='w-full flex justify-center items-center'>
				<Card className='flex justify-center items-center w-full md:w-[400px] min-h-[300px]'>
					<CardContent className='mt-6'>
						<img src={currentImg} className='h-[30svh] object-contain' />
						<div className='w-full flex justify-center items-center py-4'>
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<Button className='flex justify-center items-center gap-4'>Add Image <FaPlus /> </Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<form onSubmit={handleSubmit}>
										<DialogHeader>
											<DialogTitle>Upload Image To slideShow</DialogTitle>
											<DialogDescription>
												{/* Create new account detail. */}
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											{/* <div className=""> */}
											{/*   <Label htmlFor="username" className="text-right"> */}
											{/*     Bank Image */}
											{/*   </Label> */}
											{/*   <Input id="img" type='file' className="col-span-3" /> */}
											{/* </div> */}
											<div className="">
												{/* <Label htmlFor="name" className="text-right"> */}
												{/*  */}
												{/* </Label> */}
												<Input id="img" type='file' onChange={handleFileChange} className="col-span-3" />
											</div>
										</div>
										<DialogFooter>
											<Button type='submit'>Upload</Button>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='flex justify-between flex-wrap mt-8'>
				{
					data && data.map((item, id) => {
						return (
							<Card onClick={() => setDisplay(item.imageUrls[0].imageUrl)} className='flex justify-center items-center w-[200px]' key={id}>
								<CardContent className='py-4'>
									<img src={item.imageUrls[0].imageUrl} className='min-h-[14svh]' />
									<CardFooter className='py-2 w-full flex justify-center items-center'>
										<Dialog open={deleteOpen} onOpenChange={setDeleteOpen} inert>
											<DialogTrigger>
												<FaTrash className='hover:text-[red] hover:rounded-full h-[3vh]' />
											</DialogTrigger>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>Delete Selected Image</DialogTitle>
													<DialogDescription className='text-red-500'>
														This action is irreversable
													</DialogDescription>
												</DialogHeader>
												<DialogFooter className='flex items-center gap-4'>
													<Button type='submit' variant='destructive' onClick={() => deleteItem(item.imageUrls[0].imageUrl, item.imageUrls[0].imageId, item._id)}>Delete</Button>
													<Button type='submit' variant='outline' onClick={() => (setDeleteOpen(false))}>Cancel</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</CardFooter>
								</CardContent>
							</Card>	
						)
					})
				}
			</div>
		</div>
	)
}

export default Carousel
// const response = await axios.get('http://localhost:3000', {
//         headers: {
//           Authorization: `Bearer ${id}`
//         }
//       // withCredentials: true // Ensure cookies are included in requests
//     });
//       console.log(response)