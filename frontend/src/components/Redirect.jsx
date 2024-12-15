// import React from 'react'
import { Button } from './ui/button';
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
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { useToast } from './ui/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Redirect() {
	// const token = sessionStorage.getItem('token')
	// console.log(token)
	const navigate = useNavigate()
	const { toast } = useToast()
	const url = import.meta.env.VITE_HOME;
	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmit = async()=> {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if(!password || !email){
            toast({
                title: `All inputs are required`,
                variant: 'destructive'
            })
            return;
        }
        try{
            toast({
                title: 'Loading'
            })
            const response =await axios.post(`${import.meta.env.VITE_API_URL}admins`, {email, password})
            console.log(response)
            if(response.status === 200){
                toast({
                    title: 'Successful',
                    variant: 'success'
                })
				navigate('/')
                // sessionStorage.clear()
                // localStorage.clear()
                // window.location.replace(import.meta.env.VITE_ADMIN_URL);
                // VITE_BASE_URL
            }
        }catch(err){
        console.log(err)
        if(err.response.status === 500){
            toast({
                title: `${err.response?.data.error}! pls contact the site owner`,
                variant: 'destructive'
            })
            return;
        }
        toast({
            title: `${err.response?.data.message}: You are not an admin!!!`,
            variant: 'destructive'
        })
        }
        // sessionStorage.setItem()
        // sessionStorage.setItem('token', JSON.stringify(response.data.token))
        // navigate('/redirect')
		// window.location.replace(import.meta.env.VITE_ADMIN_URL);
    }
	return (
		<div className='relative min-h-[70vh] bg-[#164863] pb-[10vh] flex flex-col items-center justify-center'>
			<h1 className="text-lg">Your session has expired!</h1>
			<div className="flex items-center gap-4 my-4">
			<Dialog>
                    <DialogTrigger asChild>
						<button className="px-4 py-2 bg-blue-600 rounded-md">Login Again</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Admin login</DialogTitle>
                        <DialogDescription className='text-red-600 font-bold'>
                            You only have one attempt to login before being redirected to the home page!
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Email
                            </Label>
                            <Input
                            id="name"
                            type='email'
                            className="col-span-3"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Password
                            </Label>
                            <Input
                            id="username"
                            type='password'
                            className="col-span-3"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button onClick={onSubmit} type="submit">Login</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
				<a href={url}> <button className="px-4 py-2 border rounded-lg">Go Home</button></a>
			</div>
		</div>
	)
}

export default Redirect