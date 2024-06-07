import { Like } from "../models/Like.models.js";
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

		const features = await Post.aggregate([
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
					likeCount: { $size: '$likes' } ,
					isLiked: {
                        $cond: {
                            if: { $in: [req.user._id, "$likes.likedBy"] },
                            then: true,
                            else: false
                        }
                    }
				}
			},
			{
				$project: {
					content: 1,
					image: 1,
					createdAt: 1,
					updatedAt: 1,
					likeCount: 1,
					isLiked: 1,
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
		])

		res.status(200).json({
			posts: features,
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

export const likePost = async(req,res)=>{
	try {
        const { postId } = req.body;
		const userId = req.user._id;

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ post: postId, likedBy: userId });
        if (existingLike) {
            return res.status(400).json({ message: "You have already liked this post" });
        }

        // Create a new like
        const like = new Like({
            post: postId,
            likedBy: userId,
        });

        await like.save();

        return res.status(201).json({ message: "Post liked successfully", like : like});
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

export const unlikePost = async (req,res)=>{
	try {
        const { postId } = req.body;
		const userId = req.user._id;

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the like exists
        const like = await Like.findOne({ post: postId, likedBy: userId });
        if (!like) {
            return res.status(400).json({ message: "You have not liked this post" });
        }

        // Remove the like
       await like.deleteOne();

        return res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
		console.log(error);
        return res.status(500).json({ message: "Server error", error });
    }
}

