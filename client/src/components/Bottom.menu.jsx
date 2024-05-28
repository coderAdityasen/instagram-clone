import React from "react"
import { useState } from "react"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { GoHomeFill } from "react-icons/go"
import { IoMdAddCircleOutline, IoMdHeartEmpty } from "react-icons/io"
import Home from "./Home"
import Profile from "./Profile"
import Uploadpost from "./UploadPost"

function Bottommenu() {
	const [feed , setfeed] = useState("home")

	const rendercomponent = (feed) => {
		switch (feed) {
			case "home":
				return <Home/>;
			case "search":
				return <div>search</div>;
			case "create":
				return <Uploadpost/>;
			case "updates":
				return <div>updates</div>;
			case "profile":
				return <Profile/>;
			default:
				return null;
		}
	}

  return (
	<div className="w-full h-full  ">
		{rendercomponent(feed)}
		{/* switch component here */}
	
		<div className="w-full flex justify-around items-center fixed bottom-0 bg-slate-200 py-5">
        <button onClick={() => setfeed('home')}>
          <GoHomeFill className="text-3xl" />
        </button>
        <button onClick={() => setfeed('search')}>
          <FaSearch className="text-2xl" />
        </button>
        <button onClick={() => setfeed('create')}>
          <IoMdAddCircleOutline className="text-3xl" />
        </button>
        <button onClick={() => setfeed('updates')}>
          <IoMdHeartEmpty className="text-3xl" />
        </button>
        <button onClick={() => setfeed('profile')}>
          <FaUserCircle className="text-3xl" />
        </button>
      </div>
	</div>
  )
}

export default Bottommenu