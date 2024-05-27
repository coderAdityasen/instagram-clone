import { getDataAPI, postDataAPI } from "../../util/fetchApi";
import { GLOBALTYPES } from "./globalTypes";



export const login = (data : any)=> async (dispatch : any)=>{
	try {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
		const res = await postDataAPI("/users/login", data);

		dispatch({
			type: GLOBALTYPES.AUTH,
			payload: { user: res.data.data },
		  });

		dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "user logged in" } });
	
	} catch (err) {
		dispatch({
			type: GLOBALTYPES.ALERT,
			payload: { error: "failed to logged in"}
		  });
	}
}


export const logout = () => async (dispatch : any) => {
	try {
  
		 await getDataAPI("/users/logout");
	  window.location.href = "/";
	} catch (err) {
	  dispatch({
		type: GLOBALTYPES.ALERT,
		payload: { error: "failed to logout" },
	  });
	}
  };