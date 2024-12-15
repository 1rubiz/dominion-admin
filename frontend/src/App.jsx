import { useState } from 'react'
import './App.css'
import Nav from './components/nav.jsx'
import CarouselEdit from './components/carousel.jsx'
import Landing from './components/Landing.jsx'
import Redirect from './components/Redirect.jsx'
import { ScrollArea } from "@/components/ui/scroll-area"
import About from './components/about.jsx'
import Account from './components/account.jsx'
import Gallery from './components/gallery.jsx'
import Admins from './components/admins.jsx'
import Error from './components/Error.jsx'
// import axios from 'axios'
import Header from './components/header'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { UserContext } from './lib/userContext'
import { FaChevronRight } from 'react-icons/fa'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [user, setUser] = useState(false)
  const [mobile, setMobile] = useState(false)
  const handleMobile = ()=>{
    setMobile(!mobile)
  }


  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <div className='p-4 flex gap-4 max-w-[100%]'>
            <div>
              <div onClick={handleMobile} className='absolute top-0 m-2 bg-[#27374D] text-white left-0 z-20  p-2 flex justify-center items-center border-2 border-white rounded-md md:hidden'><FaChevronRight/></div>
              <Nav mobile={mobile} handleMobile={handleMobile}/>
            </div>
            <ScrollArea className="h-[93svh] w-full rounded-md border bg-[#27374D] text-white">
              <div className="p-4">
                <Header/>
                <Routes>
                  <Route path='/' element={<Landing/>}/>
                  <Route path='/carousel' element={<CarouselEdit/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/account' element={<Account/>}/>
                  <Route path='/gallery' element={<Gallery/>}/>
                  <Route path='/admins' element={<Admins/>}/>
                  <Route path='/redirect' element={<Redirect/>}/>
                  <Route path='/*' element={<Error/>}/>
                  {/* <Route path='/media' element={<Media/>}/> */}
                  {/* <Route path="/redirect" element={<Redirect/>} /> */}
                </Routes>
                <Toaster/>
              </div>
            </ScrollArea>
          </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
