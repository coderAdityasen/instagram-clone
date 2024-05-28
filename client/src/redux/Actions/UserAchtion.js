import { api_url } from "../../utils/utils";
import axios from "axios"
import {LOGIN_REQUEST , LOGIN_FAIL, LOGIN_SUCCESS, GETALLUSER_REQUEST, GETALLUSER_SUCCESS, GETALLUSER_FAIL} from "../Constants/UserConstants"

export const login = (email, password) => async (dispatch) => {
	try {
	  dispatch({ type: LOGIN_REQUEST });
	  const res = await axios.post(
		`${api_url}/users/login`,
		{ email, password },
		{withCredentials: true}
	  );
  
	  dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
	} catch (error) {
	  dispatch({ type: LOGIN_FAIL, payload: "error in code" });
	}
  };

  export const getallUser = ()=> async (dispatch)=>{
	try {
		dispatch({type : GETALLUSER_REQUEST});
		const res = await axios.get(`${api_url}/users/getalluser` , {withCredentials : true})
		dispatch({type : GETALLUSER_SUCCESS , payload : res.data.user})
	} catch (error) {
		dispatch({type : GETALLUSER_FAIL})
	}
  }

