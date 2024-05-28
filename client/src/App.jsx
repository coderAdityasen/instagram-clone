import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bottommenu from './components/Bottom.menu'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Bottommenu/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App