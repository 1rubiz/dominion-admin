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

function About() {
	return (
		<div className=' flex justify-evenly flex-wrap gap-4 pt-8'>
			<div>
				<Card className="w-[350px] bg-[#DDE6ED]" >
			      <CardHeader>
			        <CardTitle>Wecome Message</CardTitle>
			        <CardDescription>Edit Wecome Message.</CardDescription>
			      </CardHeader>
			      <CardContent>
			        <form>
						<textarea className='w-full min-h-36'>
							
						</textarea>
			        </form>
			      </CardContent>
			      <CardFooter className="flex justify-between">
			        <Button variant="outline">Clear</Button>
			        <Button>Save</Button>
			      </CardFooter>
			    </Card>
			</div>

			<div>
				<Card className="w-[350px] bg-[#DDE6ED]">
			      <CardHeader>
			        <CardTitle>Vision</CardTitle>
			        <CardDescription>Edit Vision.</CardDescription>
			      </CardHeader>
			      <CardContent>
			        <form>
						<textarea className='w-full min-h-36'>
							
						</textarea>
			        </form>
			      </CardContent>
			      <CardFooter className="flex justify-between">
			        <Button variant="outline">Clear</Button>
			        <Button>Save</Button>
			      </CardFooter>
			    </Card>
			</div>

			<div>
				<Card className="w-[350px] bg-[#DDE6ED]">
			      <CardHeader>
			        <CardTitle>Days of Service</CardTitle>
			        <CardDescription>Edit Days of service.</CardDescription>
			      </CardHeader>
			      <CardContent>
			        <form>
						<textarea className='w-full min-h-36'>
							
						</textarea>
			        </form>
			      </CardContent>
			      <CardFooter className="flex justify-between">
			        <Button variant="outline">Clear</Button>
			        <Button>Save</Button>
			      </CardFooter>
			    </Card>
			</div>

			<div>
				<Card className="w-[350px] bg-[#DDE6ED]">
			      <CardHeader>
			        <CardTitle>About Us</CardTitle>
			        <CardDescription>Edit content.</CardDescription>
			      </CardHeader>
			      <CardContent>
			        <form>
			          						<textarea className='w-full min-h-36'>
			          							
			          						</textarea>
			        </form>
			      </CardContent>
			      <CardFooter className="flex justify-between">
			        <Button variant="outline">Clear</Button>
			        <Button>Save</Button>
			      </CardFooter>
			    </Card>
			</div>
		</div>
	)
}

export default About