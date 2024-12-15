import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
//   CardDescription,
//   CardFooter,
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
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { Label } from "@/components/ui/label"
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
function Account() {
	const { toast } = useToast()
	const apiUrl = import.meta.env.VITE_API_URL;
	const home = import.meta.VITE_HOME
	// const [files, setFiles] = useState([]);
	const [bank, setBank] = useState('')
	const [name, setName] = useState('')
	const [title, setTitle] = useState('')
	const [number, setNumber] = useState(0)
	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const token = sessionStorage.getItem('token')

	// const handleFileChange = (e) => {
	// setFiles(e.target.files);
	// };
	const handleBank = (e)=>{
	setBank(e.target.value)
	}
	const handleName = (e)=>{
	setName(e.target.value)	
	}

	const handleTitle = (e)=>{
	setTitle(e.target.value)	
	}

	const handleNumber = (e)=>{
	setNumber(e.target.value)	
	}


  const handleSubmit = async (e) => {
	wait().then(() => setOpen(false));
    e.preventDefault();
	const data = {
		name,
		bank,
		title,
		number
	}
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('bank', bank);
    // formData.append('title', title)
    // formData.append('number', number)

    // for (let i = 0; i < files.length; i++) {
    //   formData.append('images', files[i]);
    // }

    try {
      await axios.post(`${apiUrl}api/accounts/create`, {
			headers: {
				Authorization: token
			}, data
		});
		toast({
			title: 'Upload Successful',
			variant: 'success'
		})
      getData()
    } catch (error) {
		if(error.response?.status === 401){
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
  };

	const getData = async()=>{
		const token = sessionStorage.getItem('token')
		try{
			const response = await axios.get(`${apiUrl}api/accounts`,
						{
							headers: {
								Authorization: token
							}
						}				
				)
			toast({
				title: 'Setup complete',
				variant: 'success'
			})
			console.log(response)
			setData(response.data.data)
		}catch(err){
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
			console.log(err)
		}
	}

const deleteItem = async (id)=>{
	// console.log(id)
	// wait().then(() => setDeleteId(false));
	const data = { id, token }
	// console.log(data)
	try {
	const response = await axios.post(`${apiUrl}api/accounts/delete`,
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
	} catch (err) {
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

	useEffect(() => {
		getData()	
	}, [])
	return (
		<div className='gap-4'>
			<div className='w-full flex justify-start m-4'>
				<Dialog  open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
					<Button className='flex justify-center items-center gap-4'>Add Account Details <FaPlus/> </Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
					<form onSubmit={handleSubmit}>
						<DialogHeader>
							<DialogTitle>New Account Detail</DialogTitle>
							<DialogDescription>
							{/* Create new account detail. */}
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="">
							{/* <Label htmlFor="username" className="text-right">
								Bank Image
							</Label>
							<Input id="img" type='file' single onChange={handleFileChange} className="col-span-3" /> */}
							</div>
							<div className="">
							<Label htmlFor="name" className="text-right">
								Title
							</Label>
							<Input value={title} onChange={handleTitle} required className="col-span-3" />
							</div>
							<div className="">
							<Label htmlFor="username" className="text-right">
								Bank Name
							</Label>
							<Input value={bank} onChange={handleBank} required className="col-span-3" />
							</div>
							<div className="">
							<Label htmlFor="username" className="text-right">
								Account Name
							</Label>
							<Input value={name} onChange={handleName} required className="col-span-3" />
							</div>
							<div className="">
							<Label htmlFor="username" className="text-right">
								Account Number
							</Label>
							<Input value={number} onChange={handleNumber} required type='number' className="col-span-3" />
							</div>
						</div>
						<DialogFooter>
							<Button>Create Account</Button>
						</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<div className='flex flex-col gap-4'>
				{
					data && data.length !== 0 ? (data.map((item, key)=>{
						return(
								<Card key={key} className='min-w-[350px] w-full md:max-w-[80%] bg-[#DDE6ED]'>
									<CardContent className='flex flex-col-reverse md:flex-row justify-between items-center gap-2 pt-4'>
										<div>
											{/* <p> <span className='font-semibold'>Title</span>{item.title} </p> */}
											<p> <span className='font-semibold'>Bank Name </span> {item.bank}</p>
											<p> <span className='font-semibold'>Account Name : </span> {item.name}</p>
											<p> <span className='font-semibold'>Account Number </span> {item.number}</p>
										</div>
										<div className='flex gap-4'>
											<Avatar className='hidden md:inline-block'>
												{/* <AvatarImage src={item.url.publicUrl} /> */}
												<AvatarFallback>{item.bank[0]}B</AvatarFallback>
											</Avatar>

											{/* <Dialog>
												<DialogTrigger asChild disabled>
													<Button className='flex justify-center items-center gap-2 font-semibold' disabled>Edit <FaEdit/></Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
													<DialogTitle>New Account Detail</DialogTitle>
													<DialogDescription>
														Edit account detail.
													</DialogDescription>
												</DialogHeader>
												<div className="grid gap-4 py-4">
													<div className="">
													<Label htmlFor="username" className="text-right">
														Bank Image
													</Label>
													<Input id="img" type='file' className="col-span-3" />
													</div>
													<div className="">
													<Label htmlFor="name" className="text-right">
														Title
													</Label>
													<Input id="title" value="Tithe" className="col-span-3" />
													</div>
													<div className="">
													<Label htmlFor="username" className="text-right">
														Bank Name
													</Label>
													<Input id="bank" value="UBA" className="col-span-3" />
													</div>
													<div className="">
													<Label htmlFor="username" className="text-right">
														Account Name
													</Label>
													<Input id="username" value="Chapel of Dominion" className="col-span-3" />
													</div>
													<div className="">
													<Label htmlFor="username" className="text-right">
														Account Number
													</Label>
													<Input id="accountNum" value="1234567890" type='number' className="col-span-3" />
													</div>
												</div>
												<DialogFooter>
													<Button type='submit'>Create Account</Button>
												</DialogFooter>
												</DialogContent>
											</Dialog> */}
											<Dialog open={deleteOpen} onOpenChange={setDeleteOpen} inert>
											<DialogTrigger>
												<FaTrash className='text-[red] hover:rounded-full h-[3vh]'/>
											</DialogTrigger>
											<DialogContent className="sm:max-w-[425px]">
												<DialogHeader>
												<DialogTitle>Delete Selected Image</DialogTitle>
													<DialogDescription className='text-red-500'>
														This action is irreversable
													</DialogDescription>
												</DialogHeader>
												<DialogFooter className='flex items-center gap-4'>
													<Button type='submit' variant='destructive' onClick={()=> deleteItem(item._id)}>Delete</Button>
													<Button type='submit' variant='outline' onClick={()=> (setDeleteOpen(false))}>Cancel</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
										</div>
									</CardContent>
								</Card>			
							)
					})) : (
						<div className='text-lg w-full text-center text-white'>
							No Account created yet!
						</div>
					)
				}				
			</div>
		</div>
	)
}

export default Account