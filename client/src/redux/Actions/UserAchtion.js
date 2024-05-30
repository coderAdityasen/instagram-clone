import { api_url } from "../../utils/utils";
import axios from "axios"
import {LOGIN_REQUEST , LOGIN_FAIL, LOGIN_SUCCESS, GETALLUSER_REQUEST, GETALLUSER_SUCCESS, GETALLUSER_FAIL, GET_CURR_USER_REQUEST, GET_CURR_USER_SUCCESS, GET_CURR_USER_FAIL} from "../Constants/UserConstants"

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

  export const signup = (data) => async(dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const res = await axios.post(
			`${api_url}/users/signup`,
			data,
			{withCredentials: true}
		  );

		dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
	  
	} catch (error) {
		
	}
  }

  export const getallUser = ()=> async (dispatch)=>{
	try {
		dispatch({type : GETALLUSER_REQUEST});
		const res = await axios.get(`${api_url}/users/getalluser` , {withCredentials : true})
		dispatch({type : GETALLUSER_SUCCESS , payload : res.data.user})
	} catch (error) {
		dispatch({type : GETALLUSER_FAIL})
	}
  }

export const getcurruser = ()=> async (dispatch)=>{
	try {
		dispatch({type : GET_CURR_USER_REQUEST});
		const res = await axios.get(`${api_url}/users/curruser` , {withCredentials : true})
		// console.log(res)
		dispatch({type : GET_CURR_USER_SUCCESS , payload : res.data.data})
	} catch (error) {
		dispatch({type : GET_CURR_USER_FAIL})
	}
}

