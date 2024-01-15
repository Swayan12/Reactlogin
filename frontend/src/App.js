import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import ForgotPassword from './ForgotPassword'



export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
    </BrowserRouter>
  )
}
