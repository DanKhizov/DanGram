import axios from "axios";
import { TAKE_USERS_INFO } from "./types";

export const uploadFile = file => async dispatch => {
  console.log(1);

  try {
    const res = await axios.post(`/api/files/upload`, file);
    dispatch({
      type: TAKE_USERS_INFO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TAKE_USERS_INFO,
      payload: err.response.data
    });
  }
};
