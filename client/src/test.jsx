import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "./redux/Actions/postAction";


const Test = () => {
	// const dispatch = useDispatch();
	const postState = useSelector((state) => state.posts);
	const { loading, allposts , hasMore } = postState;

	return (
		<div className="my-20">
			{allposts.map((post) => (
				<div key={post._id}>
					<h3>{post.content}</h3>
					<img src={post.image} alt={post.content} />
					<p>Likes: {post.likeCount}</p>
				</div>
			))}
			{loading && <p>Loading...</p>}
			{!hasMore && <p>No more posts to load</p>}
		</div>
	);
};

export default Test;
