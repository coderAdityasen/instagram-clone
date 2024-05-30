import { User } from "../models/user.models.js";
import { Follower } from "../models/followers.models.js";
import { Post } from "../models/Post.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, resp) => {
  try {
    const { username, email, fullname, password } = req.body;

    if (![username, email, fullname, password].every((field) => field.trim() !== "")){
      return resp.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return resp.status(409).json({ message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      fullname,
      password: hashPassword,
    });
    
    const savedUser = await newUser.save();

    return resp
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
  } catch (error) {
    resp.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!user || !isMatched) {
      return resp.status(400).json({ message: "Invalid email or password" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    user.refreshToken = refreshToken;
   const updateduser =  await user.save();

    const options = {
      httpOnly: true,
      secure: true
  }
    return resp
      .status(200)
      .cookie("refreshToken", refreshToken , options)
      .cookie("accessToken", accessToken , options)
      .json({
        message: "user login successfully",
        data:updateduser,
      });
  } catch (error) {
    resp.status(400).json({message : "user not found"})
  }
};

export const getallUser = async (_, resp) => {
  try {
    const user = await User.find();

    resp.status(201).json({ message: "all user found", user: user });
  } catch (error) {
    resp.status(400).json({ message: "failed to fetch" });
  }
};

export const getCurrUser = async (req, resp) => {

  const ownerid = req.user._id;
    const fetcheduser = await User.findById(ownerid).select("-password -refreshToken");
    console.log(fetcheduser);
  return resp.status(200).json({ user: fetcheduser, message: "user fetched" });
};

export const logout = async (req, resp) => {
  try {
    // Update refreshToken to undefined
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true
  }
  
    resp.clearCookie("accessToken" , options);
    resp.clearCookie("refreshToken" , options);

    return resp.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    return resp.status(400).json({ message: "Failed to logout" });
  }
};

export const updateprofile = async (req, resp) => {
  try {
    //get profile updation data from body
    const { fullname, email } = req.body;
    if (!fullname || !email) {
      return resp
        .status(400)
        .json({ message: "fullname and email are required" });
    }

    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return resp.status(401).json({ message: "email is already register" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullname,
          email,
        },
      },
      { new: true }
    ).select("-password");

    return resp
      .status(200)
      .json({ message: "profile updated successfully", data: user });
  } catch (error) {
    resp.status(400).json({ message: "failed to update used" });
  }
};

export const getuserprofile = async(req,res)=>{
  try{
  const { username } = req.params;

  if (!username?.trim()) {
     res.status(400).json({message : "failed to get username"})
  }

  const user = await User.aggregate([
      {
          $match: {
              username: username?.toLowerCase()
          }
      },
      {
          $lookup: {
              from: "followers",
              localField: "_id",
              foreignField: "following",
              as: "followers"
          }
      },
      {
          $lookup: {
              from: "followers",
              localField: "_id",
              foreignField: "follower",
              as: "following"
          }
      },
      {
          $addFields: {
              followersCount: { $size: "$followers" },
              followingCount: { $size: "$following" },
              isFollowing: {
                $cond: {
                  if: {$in: [req.user?._id, "$followers.follower"]},
                  then: true,
                  else: false
              }
              }
          }
      },
      {
          $project: {
              fullName: 1,
              username: 1,
              followersCount: 1,
              followingCount: 1,
              isFollowing: 1,
              avatar: 1,
              coverImage: 1,
              email: 1,
          }
      }
  ]);

  const posts = await Post.find({ user: user[0]._id });

    const userProfile = {
        ...user[0],
        posts: posts
    };


  if (!user.length) {
     return res.status(400).json({message : "no data found"})
  }
		
		  return res.status(200).json({message : "data fetched" , data : userProfile})

	} catch (error) {
		console.log(error)
	}
}

export const followAccount = async(req,res)=>{
  try {
    const { userIdToFollow } = req.params;
    const currentUserId = req.user._id;
  
    if (!userIdToFollow) {
     return res.status(400).json({message : "user id is missing"})
    }
  
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
    return  res.status(400).json({message : "no userfound"})
    }
  
    const existingFollow = await Follower.findOne({
      follower: currentUserId,
      following: userIdToFollow
    });
  
    if (existingFollow) {
     return res.status(400).json({message : "existing user"})
    }
  
    const newFollow = new Follower({
      follower: currentUserId,
      following: userIdToFollow
    });
  
    await newFollow.save();

    res.status(200).json({message : "user followed success"})
  } catch (error) {
    console.log(error);
  }
}

export const curruserProfile = async(req,res)=>{
  try{
    const { username } = req.params;
  
    if (!username?.trim()) {
       res.status(400).json({message : "failed to get username"})
    }
  
    const user = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "followers",
                localField: "_id",
                foreignField: "following",
                as: "followers"
            }
        },
        {
            $lookup: {
                from: "followers",
                localField: "_id",
                foreignField: "follower",
                as: "following"
            }
        },
        {
            $addFields: {
                followersCount: { $size: "$followers" },
                followingCount: { $size: "$following" },
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                followersCount: 1,
                followingCount: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
            }
        }
    ]);
  
    const posts = await Post.find({ user: user[0]._id });
  
      const userProfile = {
          ...user[0],
          posts: posts
      };
  
  
    if (!user.length) {
       return res.status(400).json({message : "no data found"})
    }
      
        return res.status(200).json({message : "data fetched" , data : userProfile})
  
    } catch (error) {
      console.log(error)
    }
}
