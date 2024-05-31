import axios from "axios"
import { GETALLPOST_FAIL, GETALLPOST_REQUEST, GETALLPOST_SUCCESS, SET_HAS_MORE, SET_TOTAL_LENGTH, UPLOAD_POST_FAIL, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCESS } from "../Constants/UserConstants"
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

export const getAllPost = (page , limit)=>async(dispatch)=>{
	try {
		dispatch({type : GETALLPOST_REQUEST})
		const res = await axios.get(`${api_url}/post/getallposts?page=${page}&limit=${limit}` , {withCredentials : true})
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