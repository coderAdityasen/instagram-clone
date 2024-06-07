import { Router } from "express";
import { getallpost, likePost, unlikePost, uploadPost } from "../controllers/Post.controller.js";
import { verifyjwt } from "../middleware/verifyjwt.js";

const postRouter = Router()

postRouter.route("/uploadPost").post(verifyjwt, uploadPost)
postRouter.route("/getallposts").get(verifyjwt , getallpost)
postRouter.route("/likepost").post(verifyjwt, likePost)
postRouter.route("/unlike").post(verifyjwt , unlikePost)



export default postRouter;