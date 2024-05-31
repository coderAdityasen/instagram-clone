import { GETALLPOST_FAIL, GETALLPOST_REQUEST, GETALLPOST_SUCCESS, SET_HAS_MORE, SET_TOTAL_LENGTH } from "../Constants/UserConstants";



const initialState = {
	loading: true,
	allposts: [],
	totalLength : 0,
	hasMore : true
  };


export const Postreducer = (state = initialState, action)=>{
	switch (action.type) {
		case GETALLPOST_REQUEST:
			return {
				...state,
				loading : true
			};
		case GETALLPOST_SUCCESS:
			return {
				...state,
				allposts: [...state.allposts, ...action.payload], // Append new posts
				loading: false,
			};
		case GETALLPOST_FAIL:
			return {
				loading : false,
				message : "no data found"
			}
		case SET_TOTAL_LENGTH:
			return {
				...state,
				totalLength : action.payload
			}
		case SET_HAS_MORE:
			return {
				  ...state,
				  hasMore: action.payload
				};
		default:
			return state;
	}
}