import React, { useEffect } from "react"
import { useState } from "react"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import { GoHomeFill } from "react-icons/go"
import { IoMdAddCircleOutline, IoMdHeartEmpty } from "react-icons/io"
import Home from "./Home"
import Profile from "./Profile"
import Uploadpost from "./UploadPost"
import Test from "../test"
import { useDispatch, useSelector } from "react-redux"
import { getAllPost , setHasMore } from "../redux/Actions/postAction"
import { getcurruser } from "../redux/Actions/UserAchtion"

function Bottommenu() {
	const [feed , setfeed] = useState("home")
	const postState = useSelector((state) => state.posts);
	const {totalLength , allposts , hasMore , loading} = postState;

	const dispatch = useDispatch()
	const [page, setPage] = useState(1);
	const [limit] = useState(2);  


	useEffect(()=>{
		dispatch(getcurruser())
	} , [])


	useEffect(() => {
		const fetchPosts = async () => {
			try {
				await dispatch(getAllPost(page, limit));
				if (totalLength == allposts.length) {
									dispatch(setHasMore(false)) // No more posts to load
								}
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, [dispatch, page, limit]);

		const loadMorePosts = () => {
		if (totalLength !== allposts.length) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
				!loading
			) {
				loadMorePosts();
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [loading]);


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