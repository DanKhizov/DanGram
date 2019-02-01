import axios from "axios";
import { TAKE_USERS_INFO } from "./types";

export const getUsersData = nickname => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${nickname}`);
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
