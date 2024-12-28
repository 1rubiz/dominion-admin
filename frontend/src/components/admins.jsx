/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from 'react'
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
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
function Admins() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const home = import.meta.VITE_HOME
	const {toast} = useToast()
	const [userName, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setpassword] = useState('')
	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false);
	const token = sessionStorage.getItem('token')
	const [newEmail, setNewEmail] = useState('')
	const [newUsername, setNewUsername] = useState('')
	const [currentId, setCurrentId] = useState('')
	const [edit, setEdit] = useState(false)
	const [deleteId, setDeleteId] = useState(false)
	
	const handleEmail = (e)=>{
  	setEmail(e.target.value)	
  }

  const handlePassword = (e)=>{
  	setpassword(e.target.value)	
  }

  const handleUsername = (e)=>{
  	setUsername(e.target.value)	
  }

  const setId = (id)=>{
  	// setEdit()
  	setCurrentId(id)
  	setNewEmail('')
  	setNewUsername('')
  }

  const handleNewEmail =(e)=>{
  	setNewEmail(e.target.value)
  }

  const handleNewUsername = (e)=>{
  	setNewUsername(e.target.value)
  }

  const handleEdit = async (id) =>{
  	e.preventDefault()
  	toast({
			title: 'Loading...',
		})
  	// console.log(newEmail, newUsername)
  	// console.log(currentId)
  	const data = {}
	if(newEmail) data.email = newEmail;
	if(newUsername) data.username = newUsername;
	data.id = id;
    // console.log(data)
    try {
      const response = await axios.patch(`${apiUrl}api/admins/update`,
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
  const deleteItem = async (id)=>{
  	// console.log(id)
  	wait().then(() => setDeleteId(false));
  	const data = {
    	id,
    	token
    }
    // console.log(data)
    try {
      const response = await axios.post(`${apiUrl}api/admins/delete`,
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
  const handleSubmit = async (e) => {
  	wait().then(() => setOpen(false));
    e.preventDefault();
    const data = {
    	username: userName,
    	email,
    	password
    }
    console.log(data)
    try {
      const response = await axios.post(`${apiUrl}api/admins/create`,
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
  };
  const getData = async()=>{
		const token = sessionStorage.getItem('token')
		try{
			const response = await axios.get(`${apiUrl}api/admins/`,
						{
							headers: {
								Authorization: token
							}
						}				
				)
			 setTimeout(()=>{
      	toast({
      	title: response.data.message,
      	variant: 'success'
      })
      }, 2000)
			console.log(response)
			setData(response.data.admins)
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
	useEffect(() => {
		getData()	
	}, [])
	// toast({
 //          title: "Scheduled: Catch up ",
 //          description: "Friday, February 10, 2023 at 5:57 PM",
 //      })
	return (
		<div className='gap-4'>
			<div className='w-full flex justify-start m-4'>
				 <Dialog open={open} onOpenChange={setOpen}>
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
					            <Label htmlFor="username" className="text-right">
					              Userame
					            </Label>
					            <Input id="username" value={userName} onChange={handleUsername} required type='text' className="col-span-3" />
					          </div>
					          <div className="">
					            <Label htmlFor="name" className="text-right">
					              Email
					            </Label>
					            <Input placeholder='Email' type='email' value={email} onChange={handleEmail} required className="col-span-3" />
					          </div>
					          <div className="">
					            <Label htmlFor="username" className="text-right">
					              Password
					            </Label>
					            <Input id="password" type='text' value={password} onChange={handlePassword} required placeholder="Password" className="col-span-3" />
					          </div>
					        </div>
					        <DialogFooter>
					        	<DialogClose asChild>
					            <Button type="button" variant="outline">
					              Close
					            </Button>
					          </DialogClose>
					          <Button>Create Admin</Button>
					        </DialogFooter>
					       </form>
			      </DialogContent>
			    </Dialog>
			</div>
			<div className='px-4 flex flex-col gap-4'>
				{
					data && data.map((item, key)=>{
						return(
							<Card key={key} className='min-w-[400px] w-full md:max-w-[60%] bg-[#DDE6ED]'>
					<CardContent className='flex justify-between items-center gap-2 pt-4'>
						<div>
							<p> <span className='font-semibold'>Username : {item.username}</span> </p>
							<p> <span className='font-semibold'>Email:  </span> {item.email}</p>
							{/* <p> <span className='font-semibold'>Account Name : </span> Chapel of Dominion Min. Inc</p> */}
							{/* <p> <span className='font-semibold'>Account Number </span></p> */}
						</div>
						<div className='flex gap-4 items-center justify-center'>
							<Dialog open={deleteId} onOpenChange={setDeleteId}>
							  <DialogTrigger>
							  	<Button className='flex justify-center items-center gap-2 font-semibold'><FaTrash/></Button>
							  </DialogTrigger>
							  <DialogContent>
							    <DialogHeader>
							      <DialogTitle>Are you absolutely sure?</DialogTitle>
							      <DialogDescription>
							        This action cannot be undone. This will permanently delete your account
							        and remove your data from our servers.
							      </DialogDescription>
							    </DialogHeader>
							    <DialogFooter>
					        	<DialogClose asChild>
					            <Button type="button" variant="outline">
					              Close
					            </Button>
					          </DialogClose>
					          {/* <DialogClose asChild> */}
					          	<Button onClick={()=> deleteItem(item._id)}>Delete Admin</Button>
					          {/* </DialogClose> */}
					        </DialogFooter>
							  </DialogContent>
							</Dialog>

							<Dialog open={edit} onOpenChange={setEdit}>
						      <DialogTrigger asChild>
						        <Button className='flex justify-center items-center gap-2 font-semibold' onClick={()=>setId(item.id)}>Edit <FaEdit/></Button>
						      </DialogTrigger>
						      <DialogContent className="sm:max-w-[425px]">
						      	{/* <form onSubmit={handleEdit}> */}
							        <DialogHeader>
							          <DialogTitle>Edit admin Detail</DialogTitle>
							          <DialogDescription>
							            {/* Create new account detail. */}
							          </DialogDescription>
							        </DialogHeader>
							        <div className="grid gap-4 py-4">
							          <div className="">
							            <Label htmlFor="username" className="text-right">
							              User Name
							            </Label>
							            <Input placeholder={item.userName} type='text' className="col-span-3" onChange={handleNewUsername}/>
							          </div>
							          <div className="">
							            <Label htmlFor="name" className="text-right">
							              Email
							            </Label>
							            <Input placeholder='Email' className="col-span-3" onChange={handleNewEmail}/>
							          </div>
							        </div>
							        <DialogFooter>
							        	<DialogClose asChild>
							            <Button variant="outline">
							              Close
							            </Button>
							          </DialogClose>
							          <Button onClick={()=> handleEdit(item._id)}  type='submit'>Update Admin</Button>
							        </DialogFooter>
						      	{/* </form> */}
						      </DialogContent>
						    </Dialog>
						</div>
					</CardContent>
				</Card>				
							)
					})
				}
				</div>
		</div>
	)
}

export default Admins