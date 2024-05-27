import axios from 'axios';
import { API_URL } from './config';

export const getDataAPI = async (url : string) => {
    const res = await axios.get(`${API_URL}/${url}`, {withCredentials : true});
    return res;
}

export const postDataAPI = async (url : String, post : object, ) => {
  const res = await axios.post(`${API_URL}/${url}`, post, {withCredentials : true});
  return res;
};

