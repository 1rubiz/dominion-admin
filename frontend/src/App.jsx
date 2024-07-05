import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/nav.jsx'
import CarouselEdit from './components/carousel.jsx'
import { ScrollArea } from "@/components/ui/scroll-area"
import About from './components/about.jsx'
import Account from './components/account.jsx'
import axios from 'axios'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getData = async ()=>{
      const data = await axios.get('http://localhost:3000')
      console.log(data)
    }
    // getData()
  })

  return (
    <BrowserRouter>
      <div className='p-4 flex gap-4 '>
        <Nav/>
        <ScrollArea className="h-[93svh] w-full rounded-md border">
          <div className="p-4">
            <Routes>
              <Route path='/:id' element={<CarouselEdit/>}/>
              <Route path='/:id/about' element={<About/>}/>
              <Route path='/:id/account' element={<Account/>}/>
              {/* <Route path='/*' element={<ErrorPage/>}/> */}
              {/* <Route path='/media' element={<Media/>}/> */}
              {/* <Route path="/redirect" element={<Redirect/>} /> */}
            </Routes>
          </div>
        </ScrollArea>
      </div>
    </BrowserRouter>
  )
}

export default App
