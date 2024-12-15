import React, { useState, useEffect } from 'react'
import DigitalClock from './digiClock'
import { useLocation } from 'react-router-dom';
function Header() {
	const location = useLocation()
	const [path, setPath] = useState('')
	const pathname = ()=>{
		const path = location.pathname.split('/')
		if(path[1] !== ''){
			setPath(path[1]);
			return;
		}
		setPath('ADMIN')
	}
	useEffect(() => {
		pathname();
	}, [location])
	// const path = location.pathname.split('/')
	// console.log(path)
	return (
		<div className='w-full text-white px-8 flex items-center justify-center md:justify-between'>
			<h1 className='text-lg md:text-3xl font-serif uppercase'>{path} Page </h1>
			<span className='hidden md:inline-block'><DigitalClock/></span>
		</div>
	)
}

export default Header

// 
// <Dialog>
//                     <DialogTrigger asChild>
//                       <div className='w-[100%] p-2 hover:bg-[#164863]'>
//                       <Button variant="outline">Edit Profile</Button>
//                       </div>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle>Admin Login</DialogTitle>
//                         <DialogDescription>
//                           This is only meant for Admins
//                         </DialogDescription>
//                       </DialogHeader>
//                       <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                           <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Username</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Email" type="email" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Password</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Password" type='password' {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <Button type="submit">Submit</Button>
//                         </form>
//                       </Form>
//                     </DialogContent>
//                   </Dialog>