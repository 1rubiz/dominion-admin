import React from 'react'
import { Button } from "@/components/ui/button"
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
import { FaPlus, FaEdit } from 'react-icons/fa'
import { Label } from "@/components/ui/label"

function Account() {
	return (
		<div className='gap-4'>
			<div className='w-full flex justify-start m-4'>
				 <Dialog>
			      <DialogTrigger asChild>
			        <Button className='flex justify-center items-center gap-4'>Add Account Details <FaPlus/> </Button>
			      </DialogTrigger>
			      <DialogContent className="sm:max-w-[425px]">
			        <DialogHeader>
			          <DialogTitle>New Account Detail</DialogTitle>
			          <DialogDescription>
			            {/* Create new account detail. */}
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
			          <Button>Create Account</Button>
			        </DialogFooter>
			      </DialogContent>
			    </Dialog>
			</div>
			<div>
				<Card className='min-w-[350px] max-w-[50%] bg-[#DDE6ED]'>
					<CardContent className='flex justify-between items-center gap-2 pt-4'>
						<div>
							<p> <span className='font-semibold'>Title</span> </p>
							<p> <span className='font-semibold'>Bank Name </span></p>
							<p> <span className='font-semibold'>Account Name : </span> Chapel of Dominion Min. Inc</p>
							<p> <span className='font-semibold'>Account Number </span></p>
						</div>
						<div>
							<Dialog>
						      <DialogTrigger asChild>
						        <Button className='flex justify-center items-center gap-2 font-semibold'>Edit <FaEdit/></Button>
						      </DialogTrigger>
						      <DialogContent className="sm:max-w-[425px]">
						        <DialogHeader>
						          <DialogTitle>New Account Detail</DialogTitle>
						          <DialogDescription>
						            {/* Create new account detail. */}
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
						          <Button>Create Account</Button>
						        </DialogFooter>
						      </DialogContent>
						    </Dialog>
						</div>
					</CardContent>
				</Card>				
			</div>
		</div>
	)
}

export default Account