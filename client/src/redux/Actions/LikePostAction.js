import { LIKE_POST, LIKE_POST_FAIL } from "../Constants/UserConstants"


export const likePost = (postId)=> async (dispatch)=>{
	try {
		const res = await axios.post(`${api_url}/post/likepost` , postId , {withCredentials : true})
		console.log(res);
		dispatch({type : LIKE_POST , payload : postId })
	} catch (error) {
		dispatch({type : LIKE_POST_FAIL})
	}
}
