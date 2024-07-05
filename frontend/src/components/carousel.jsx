import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'

function Carousel() {
	const data = [
		'/img.JPG',
		'/img2.JPG',
		'/logo.png',
		'/vite.svg'
		]
	const [currentImg, setCurrentImg] = useState(data[0])
	const setDisplay = (value)=>{
		setCurrentImg(value)
	}
	return (
		<div>
			
			<div className='w-full flex justify-center items-center'>
				<Card className='flex justify-center items-center w-[400px] min-h-[300px]'>
					<CardContent className='mt-6'>
						<img src={currentImg} className='h-[30svh]'/>
						<div className='w-full flex justify-center items-center py-4'>
							 <Dialog>
						      <DialogTrigger asChild>
						        <Button className='flex justify-center items-center gap-4'>Add Image <FaPlus/> </Button>
						      </DialogTrigger>
						      <DialogContent className="sm:max-w-[425px]">
						        <DialogHeader>
						          <DialogTitle>New Account Detail</DialogTitle>
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
						            <Label htmlFor="name" className="text-right">
						              Title
						            </Label>
						            <Input id="title" value="Tithe" className="col-span-3" />
						          </div>
						        </div>
						        <DialogFooter>
						          <Button>Create Account</Button>
						        </DialogFooter>
						      </DialogContent>
						    </Dialog>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='flex justify-between flex-wrap mt-8'>
				{
					data.map((item, id)=>{
						return(
							<Card onClick={()=> setDisplay(item)} className='flex justify-center items-center w-[200px]' key={id}>
								<CardContent className='py-4'>
									<img src={item} className='min-h-[14svh]'/>
									<CardFooter className='py-2 w-full flex justify-center items-center'>
										<FaTrash className='hover:text-[red] hover:rounded-full h-[3vh]'/>
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