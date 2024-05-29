import { Router } from "express";
import { getallpost, uploadPost } from "../controllers/Post.controller.js";
import { verifyjwt } from "../middleware/verifyjwt.js";

const postRouter = Router()

postRouter.route("/uploadPost").post(verifyjwt, uploadPost)
postRouter.route("/getallposts").get(verifyjwt , getallpost)



export default postRouter;