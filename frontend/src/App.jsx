import React from 'react'
import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import CreateProduct from './pages/CreateProduct'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { UseAuthContext } from './hooks/UseAuthContext'


function App() {
 const {user} = UseAuthContext()

  return (
   <div className='app'>
     <BrowserRouter>
        <NavBar/>
        <div className='pages'>
          <Routes>
            <Route path='/Login' element = {!user ? <Login/> : <Navigate to='/'/>}></Route>
            <Route path='/Signup' element = {!user ? <Signup/>: <Navigate to = '/'/>}></Route>
            <Route path='/' element = {user ? <Home/>: <Navigate to ="/login"/>}></Route>
            <Route path='/create' element = {user ? <CreateProduct/> : <Navigate to = '/'/>}></Route>
          </Routes>
        </div>
     </BrowserRouter>
   </div>
  )
}

export default App
