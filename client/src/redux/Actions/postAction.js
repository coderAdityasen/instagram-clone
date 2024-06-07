import axios from "axios"
import { GETALLPOST_FAIL, GETALLPOST_REQUEST, GETALLPOST_SUCCESS, LIKE_POST, LIKE_POST_FAIL, SET_HAS_MORE, SET_TOTAL_LENGTH, UNLIKE_POST, UNLIKE_POST_FAIL, UPLOAD_POST_FAIL, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCESS } from "../Constants/UserConstants"
import { api_url } from "../../utils/utils"


export const uploadpost = (data)=>async(dispatch)=>{
	try {
		dispatch({type : UPLOAD_POST_REQUEST})
		const res = await axios.post(`${api_url}/post/uploadPost` , data , {withCredentials: true})
		dispatch({type : UPLOAD_POST_SUCESS})
	} catch (error) {
		dispatch({type : UPLOAD_POST_FAIL})
	}

}

export const getAllPost = ()=>async(dispatch)=>{
	try {
		dispatch({type : GETALLPOST_REQUEST})
		const res = await axios.get(`${api_url}/post/getallposts` , {withCredentials : true})
		// console.log(res);
		dispatch({type : GETALLPOST_SUCCESS , payload : res.data.posts})
		dispatch({type : SET_TOTAL_LENGTH , payload : res.data.totalPosts})

	} catch (error) {
		dispatch({type : GETALLPOST_FAIL})
	}
}

export const setHasMore = (hasMore) => ({
	type: SET_HAS_MORE,
	payload: hasMore
  });

  export const likePost = (postId)=>async (dispatch)=>{
	try {
		  await axios.post(`${api_url}/post/likepost` , {postId : postId} , {withCredentials : true})
		console.log("post liked" );
		dispatch({type : LIKE_POST })
	} catch (error) {
		dispatch({type : LIKE_POST_FAIL})
	}
  }

  export const unlikePost = (postId)=>async (dispatch)=>{
	try {
		await axios.post(`${api_url}/post/unlike` , {postId : postId} , {withCredentials : true})
		console.log("post unliked");
		dispatch({type : UNLIKE_POST})
	} catch (error) {
		dispatch({type : UNLIKE_POST_FAIL})
	}
  }

  