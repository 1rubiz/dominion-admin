// import React from 'react'
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

function Gallery() {
	const { toast } = useToast()
	const apiUrl = import.meta.env.VITE_API_URL;
	const home = import.meta.VITE_HOME
	const token = sessionStorage.getItem('token')
	const [files, setFiles] = useState([]);
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [data, setData] = useState(null)
	const [collections, setCollections] = useState([])
	const [selectedEvent, setSelectedEvent] = useState('')
	const [customCollection, setCustomCollection] = useState('')
	const [collectionName, setCollectionName] = useState('')

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};

	useEffect(() => {
		if (selectedEvent === '' || selectedEvent === 'new') {
			setData([])
			return;
		} else {
			filterData(selectedEvent)
		}
	}, [selectedEvent])

	const handleSubmit = async (e) => {
		// wait().then(() => setOpen(false));
		toast({
			title: 'Loading...',
		})
		e.preventDefault();
		if (!files) {
			toast({
				title: 'Select files for upload',
				variant: 'destructive'
			})
		}
		const formData = new FormData();
		formData.append('collectionName', collectionName);
		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i]);
		}

		try {
			const response = await axios.post(`${apiUrl}upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token
				},
			});
			toast({
				title: response.data.message,
				variant: 'success'
			})
			setOpen(false)
			getCollections()
			filterData(collectionName)
		} catch (error) {
			if (error.response?.status === 401) {
				setTimeout(() => {
					sessionStorage.clear()
					window.location.replace(home);
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

	const deleteItem = async (url, id) => {
		// console.log(url)
		// wait().then(() => setDeleteId(false));
		toast({
			title: 'Loading...',
		})
		const imageUrls = [url]
		const collectionName = selectedEvent
		const data = { imageUrls, collectionName, id, token }
		// console.log(data)
		try {
			const response = await axios.patch(`${apiUrl}api/gallery/delete`,
				{
					headers: {
						Authorization: token
					}, data
				});
			toast({
				title: response.data.message,
				variant: 'success'
			})
			getCollections()

			// getData()
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

	const filterData = async (val) => {
		toast({
			title: 'Loading...',
		})
		// const token = sessionStorage.getItem('token')
		try {
			const formData = new FormData();
			console.log(val)
			formData.append('collectionName', val)
			const response = await axios.post(`${apiUrl}api/gallery/filter`, { val })
			toast({
				title: 'Successful',
				variant: 'success'
			})
			console.log(response)
			setData(response.data.imageUrls)
		} catch (err) {
			if (err.response?.status === 401) {
				setTimeout(() => {
					sessionStorage.clear()
					window.location.replace(home);
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

	const getData = async () => {
		toast({
			title: 'Loading...',
		})
		const token = sessionStorage.getItem('token')
		try {
			const response = await axios.get(`${apiUrl}api/gallery`,
				{
					headers: {
						Authorization: token
					}
				}				
			)
			toast({
				title: 'Successful',
				variant: 'success'
			})
			console.log(response)
			setData(response.data.data)
		} catch (err) {
			if (err.response?.status === 401) {
				setTimeout(() => {
					sessionStorage.clear()
					window.location.replace(home);
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
	const getCollections = async () => {
		toast({
			title: 'Getting collections...',
		})
		const token = sessionStorage.getItem('token')
		try {
			const response = await axios.get(`${apiUrl}api/gallery/collections`,
				{
					headers: {
						Authorization: token
					}
				}				
			)
			console.log(response)
			if (response.status === 200) {
				toast({
					title: 'Fetched collections',
					variant: 'success'
				})
				if (response.data) {
					setCollections(response.data)	
				}
			}
		} catch (err) {
			if (err.response?.status === 401) {
				setTimeout(() => {
					sessionStorage.clear()
					window.location.replace(home);
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
		// getData()
		getCollections()
	}, [])
	const [currentImg, setCurrentImg] = useState(null)
	const setDisplay = (value) => {
		setCurrentImg(value)
	}

	const checkCollection = () => {
		if (selectedEvent) {
			if (selectedEvent === 'new' && customCollection === '') {
				// if(){
				toast({
					title: 'please input collection name',
					variant: 'destructive'
				})
				setOpen(false)
				// }
			} else {
				if (selectedEvent !== 'new') {
					// console.log(selectedEvent)
					setCollectionName(selectedEvent)
					setOpen(true)
					return;
				}
				if (customCollection.length < 5) {
					toast({
						title: 'Event/Collection name should be more than 5 characters',
						variant: 'destructive'
					})
					setOpen(false)
					return;
				}
				// console.log(customCollection)
				setCollectionName(customCollection)
				setOpen(true)
			}
		} else {
			toast({
				title: 'Please select a collection/Event',
				variant: 'destructive'
			})
			setOpen(false)
		}
	}
	return (
		<div>
			<div className='w-full flex flex-col justify-center items-center'>
				<div className="grid grid-cols-2 my-4 w-full md:w-1/2 text-white md:flex-row gap-2 p-2 bg-gradient-to-r from-[#817F75] to-[#08090A] shadow-lg rounded-md">
					{/* Year Dropdown */}
					<div className="w-full col-span-2">
						{/* {selectedEvent} */}
					</div>

					{/* Event Dropdown */}
					<div className="col-span-2 flex flex-col text-xs w-full">
						<label htmlFor="event-filter" className="text-gray-200 font-semibold mb-2 text-xs">
							Select Collections
						</label>
						<select
							id="event-filter"
							value={selectedEvent}
							onChange={(e) => setSelectedEvent(e.target.value)}
							className="border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring focus:ring-blue-300 focus:outline-none"
						>
							<option value="">Select...</option>
							<option value="new">Create new collection</option>
							{collections.map((event, key) => (
								<option key={key} value={event}>
									{event}
								</option>
							))}
						</select>
					</div>
					{
						selectedEvent === 'new' && (
							<div className="w-full col-span-2">
								<p className="text-sm">Collection/Event Name (preferred format: Event/year)</p>
								<input 
									value={customCollection}
									onChange={(e) => setCustomCollection(e.target.value)}
									type="text" 
									name="" 
									id="" 
									className="w-full text-black my-2 rounded-md text-base placeholder:text-xs px-2 py-1" placeholder="Collection/Event Name" />
							</div>
						)
					}
				</div>
				<Card className='flex justify-center items-center w-full md:w-[400px] min-h-[300px]'>
					<CardContent className='mt-6'>
						<img src={currentImg} className='h-[30svh] object-contain' />
						<div className='w-full flex justify-center items-center py-4'>
							<Button onClick={checkCollection} className='flex justify-center items-center gap-4'>Add Image <FaPlus /> </Button>
							<Dialog open={open} onOpenChange={setOpen}>
								{/* <DialogTrigger asChild>
									
								</DialogTrigger> */}
								<DialogContent className="sm:max-w-[425px]">
									<form onSubmit={handleSubmit}>
										<DialogHeader>
											<DialogTitle>Upload Image To {selectedEvent || customCollection} Collection</DialogTitle>
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
												<Input id="img" type='file' multiple onChange={handleFileChange} className="col-span-3" />
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
							<Card onClick={() => setDisplay(item.imageUrl)} className='flex justify-center items-center w-[200px]' key={id}>
								<CardContent className='py-4'>
									<img src={item.imageUrl} className='min-h-[14svh] object-contain' />
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
													<Button type='submit' variant='destructive' onClick={() => deleteItem(item.imageUrl, item.imageId)}>Delete</Button>
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

export default Gallery