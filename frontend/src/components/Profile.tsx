
function Profile() {
  return (
	<>
	<div className="w-full">
		<div className="w-full flex justify-between items-center">
			<div className="w-28 h-28 rounded-full">
			<img src="https://i.pinimg.com/564x/54/26/a5/5426a51fe15b4bb1dca378b3f6963d30.jpg" className="w-28 rounded-full m-2" alt="" />
			</div>
	

	<h1 className="text-center font-semibold">54 <br />
	Posts
	</h1>

	<h1 className="text-center font-semibold">567<br />
	Followers
	</h1>

	<h1 className="mr-2 text-center font-semibold">23 <br />
	Following
	</h1>

		</div>

		{/* bio */}
		<h1 className="ml-5 mt-5">username</h1>
		<p className="ml-5">digital creator </p>
		<p className="ml-5">work from home</p>
		{/* edit profile button */}

		<button className="w-[90%] ml-5 rounded-md bg-white my-5 py-1 ">Edit Profile</button>

		<hr />
		<div>
			images college
		</div>
	</div>
	</>
  )
}

export default Profile