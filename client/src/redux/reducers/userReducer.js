import {
	GETALLUSER_FAIL,
	GETALLUSER_REQUEST,
  GETALLUSER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../Constants/UserConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
	
	case LOGOUT_SUCCESS:
		return {
		  loading: false,
		  user: null,
		  isAuthenticated: false,
		};

	case GETALLUSER_REQUEST:
		return {
			loading : true,
		}
	case GETALLUSER_SUCCESS: 
		return  {
			...state,
			loading : false,
			allUsers : action.payload,
			message : "all user fetched success"
		}
	case GETALLUSER_FAIL:
		return {
			loading: false,
			message : "something went wrong"
		}
    default:
		return state
      break;
  }
};

