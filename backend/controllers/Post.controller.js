import { Post } from "../models/Post.models.js";


export const getallpost = async(req,res)=>{
	try {
		const allPosts = await Post.find().populate({
			path: 'user',
			select: 'fullname username avatar'
		  });


		res.status(200).json({post : allPosts , message : "all post fetched"})
	} catch (error) {
		res.status(400).json({message : "error while getting all the post"})
	}
}



export const uploadPost = async(req,res)=>{
	try {
		const {image , content } = req.body;

		const newPost = new Post({
			content,
			image,
			user: req.user._id,
		  });

		  await newPost.save();

		  res.status(200).json({message : "post uploaded successfully"})

	} catch (error) {
		res.status(400).json({message : "post upload failed"})
	}
}

