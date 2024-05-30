import mongoose from "mongoose"

const LikeSchema = mongoose.Schema({
	post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
}, {timestamps: true})

export const Like = mongoose.model("Like" , LikeSchema)

