import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
        fullname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
          },
          username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
            unique: true,
          },
          email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
          },
          avatar: {
            type: String,
            default:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          },
          role: {
            type: String,
            default: "user",
          },
          gender: {
            type: String,
            default: "male",
          },
          mobile: {
            type: String,
            default: "",
          },
          address: {
            type: String,
            default: "",
          },
          saved: [
            {
              type: mongoose.Types.ObjectId,
              ref: 'post'
            }
          ],
          story: {
            type: String,
            default: "",
            maxlength: 200,
          },
          website: {
            type: String,
            default: "",
          },
          followers: [
            {
              type: mongoose.Types.ObjectId,
              ref: "user",
            },
          ],
          following: [
            {
              type: mongoose.Types.ObjectId,
              ref: "user",
            },
          ],
        },
        {
          timestamps: true,
        }
    )

userSchema.method()
export const User = mongoose.model("User" ,userSchema )
