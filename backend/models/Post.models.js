import mongoose from "mongoose"

const postSchema = mongoose.Schema(
	{
		content: {
			type : String,
			require : true,
		},

		image: {
		  type: String,
		  required: true,
		},
		
		user: {
		  type: mongoose.Types.ObjectId,
		  ref: "User",
		},
	  },
	  {
		timestamps: true,
	  }
)

export const Post = mongoose.model("Post" , postSchema)