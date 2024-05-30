import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Test() {
	const user = useSelector((state)=>state.user)
	console.log(user.isAuthenticated)
  return (
	<div>Loading...</div>
  )
}

export default Test