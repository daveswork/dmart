import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useLoaderData } from 'react-router-dom'
import NavBar from './components/NavBar'


function App() {
  const [count, setCount] = useState(0)
  const items = useLoaderData()
  console.log(items)

  return (
  <div>
    <header><NavBar/></header>
    <Outlet context={{}}/>
  </div>
  )
}

export default App
