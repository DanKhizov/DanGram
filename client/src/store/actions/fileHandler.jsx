import axios from "axios";
import { TAKE_USERS_INFO } from "./types";

export const uploadFile = file => async dispatch => {
  let data;

  try {
    const res = await axios.post(`/api/files/upload`, file);
    data = res.data;
  } catch (err) {
    data = err.response.data;
  }

  dispatch({
    type: TAKE_USERS_INFO,
    payload: data
  });
};
