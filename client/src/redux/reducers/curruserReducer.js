import { GET_CURR_USER_FAIL, GET_CURR_USER_REQUEST, GET_CURR_USER_SUCCESS } from "../Constants/UserConstants";



export const curruser = (state = { curruser: {} }, action)=>{
	switch (action.type) {
		case GET_CURR_USER_REQUEST:
		return {
			loading : true,
		}
	case GET_CURR_USER_SUCCESS:
		return {
			loading : false,
			currUser : action.payload
		}
	case GET_CURR_USER_FAIL: 
		return {
			message : "failed"
		}
	
		default:
			return state;
	}
}