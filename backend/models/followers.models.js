import mongoose, { Schema } from "mongoose";

const followersSchema = new Schema({
	follower: {
	  type: Schema.Types.ObjectId, // one who is subscribing
	  ref: "User",
	  required: true
	},
	following: {
	  type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
	  ref: "User",
	  required: true
	}
  }, { timestamps: true });
  
export const Follower = mongoose.model("Follower" , followersSchema)
