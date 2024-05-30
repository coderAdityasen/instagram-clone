import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bottommenu from './components/Bottom.menu'
import Login from './components/Login'
import Signup from './components/Signup'
import { useSelector } from 'react-redux'
import Test from './test'

function App() {
  const user = useSelector((state)=>state.user)
  
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='*' element={<Login/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {
        user.isAuthenticated ? (
      <Route path='/home' element={<Bottommenu/>}/>
        ) : null
      }
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App