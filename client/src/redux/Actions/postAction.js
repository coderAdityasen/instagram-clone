import axios from "axios"
import { UPLOAD_POST_FAIL, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCESS } from "../Constants/UserConstants"
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