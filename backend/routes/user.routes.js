import { Router } from "express";
import {
  getCurrUser,
  getallUser,
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
userRoutes.route("/curruser").get(verifyjwt, getCurrUser);
userRoutes.route("/updateprofile").post(verifyjwt, updateprofile);
userRoutes.route("/logout").get(verifyjwt, logout);





export default userRoutes;
