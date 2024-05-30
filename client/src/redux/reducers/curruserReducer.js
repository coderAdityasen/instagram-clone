import { GET_CURR_USER_FAIL, GET_CURR_USER_REQUEST, GET_CURR_USER_SUCCESS } from "../Constants/UserConstants";


const initialState = {
	loading: true,
	curruser: {}
  };


export const curruser = (state = initialState, action)=>{
	switch (action.type) {
		case GET_CURR_USER_REQUEST:
			return {
				...state,
				loading: true,
			  };
	case GET_CURR_USER_SUCCESS:
		return {
			...state,
			loading: false,
			curruser: action.payload
		  };
	case GET_CURR_USER_FAIL: 
	return {
        ...state,
        loading: false,
        message: "failed"
      };
	
		default:
			return state;
	}
}