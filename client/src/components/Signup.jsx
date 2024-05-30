import React from "react"

import { Link } from "react-router-dom"

function Signup() {
  return (
	<div className="w-full mt-5 flex justify-center items-center ">
		<div className="hidden">
			{/* image  */}
		</div>

		<div>
			<form className=" border w-[23rem]">
				<div className="w-full ">
					<div  id="bgimage" className="py-5 mx-auto">
					<img
              src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
              className="w-40 mx-auto"
              alt=""
            />
					</div>
					<h1 className="text-gray-600 mx-12 font-semibold">Sign up to see photos and videos from your friends.</h1>
					<button className="bg-blue-500 text-white mx-auto rounded-md my-5 ml-10 px-16 py-1">Login using FaceBook</button>
					<p className="text-center">OR</p>
					<br />
					
					
				</div>
				<div className="grid mx-5 gap-2 ">
					
						<input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2" type="email" placeholder=" Email" />
						<input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2" type="text" placeholder="FullName" />
						<input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2" type="text" placeholder="Username" />
						<input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2" type="password" placeholder="Password" />
					
					<h1 className="text-center mx-5 text-sm text-gray-400">
By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</h1>
<button className="bg-blue-500 text-white mx-auto rounded-md my-5 px-28 py-1">Sign up</button>
<h1 className="text-center">Have an account ? <span className="text-blue-500"><Link to="/login">Login</Link></span></h1>
				</div>
				
			</form>
		</div>
	</div>
  )
}

export default Signup