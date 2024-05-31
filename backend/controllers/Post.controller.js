import { Post } from "../models/Post.models.js";

class APIfeatures  {
	constructor(query, queryString){
	  this.query = query;
	  this.queryString = queryString;
	}
  
	paginating(){
	  const page = this.queryString.page * 1 || 1; 
	  const limit = this.queryString.limit * 1 || 2;
	  const skip = (page -1) * limit; 
	  this.query = this.query.skip(skip).limit(limit);
	  return this;
	}
  }
  

export const getallpost = async(req,res)=>{
	try {
		const totalPostsCount = await Post.countDocuments();

		const features = new APIfeatures(Post.aggregate([
			{
				$lookup: {
					from: 'users', // Collection name
					localField: 'user',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$unwind: '$user' // Deconstruct the user array
			},
			{
				$lookup: {
					from: 'likes', // Collection name
					localField: '_id',
					foreignField: 'post',
					as: 'likes'
				}
			},
			{
				$addFields: {
					likeCount: { $size: '$likes' } // Add like count field
				}
			},
			{
				$project: {
					content: 1,
					image: 1,
					createdAt: 1,
					updatedAt: 1,
					likeCount: 1,
					user: {
						_id: 1,
						fullName: 1,
						username: 1,
						avatar: 1
					}
				}
			},
			{
				$sort: { createdAt: -1 } // Sort posts by creation date
			}
		]), req.query).paginating();

		const allPosts = await features.query;

		res.status(200).json({
			posts: allPosts,
			totalPosts: totalPostsCount,
			message: "All posts fetched successfully"
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Error while getting all the posts" });
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

