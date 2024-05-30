import { Router } from "express";
import {
  curruserProfile,
  followAccount,
  getallUser,
  getuserprofile,
  login,
  logout,
  registerUser,
  updateprofile,
} from "../controllers/user.controller.js";
import { verifyjwt } from "../middleware/verifyjwt.js";

const userRoutes = Router();

userRoutes.route("/signup").post(registerUser);
userRoutes.route("/getalluser").get(getallUser);
userRoutes.route("/login").post(login);
userRoutes.route("/curruser").get(verifyjwt, curruserProfile);
userRoutes.route("/updateprofile").post(verifyjwt, updateprofile);
userRoutes.route("/logout").get(verifyjwt, logout);
userRoutes.route("/getuserproifle/:username").get(verifyjwt, getuserprofile)
userRoutes.route("/followuser/:userIdToFollow").get(verifyjwt, followAccount)






export default userRoutes;
