import axios from "axios";
import { TAKE_USERS_INFO } from "./types";

export const getUsersData = nickname => async dispatch => {
  let data;

  try {
    const res = await axios.get(`/api/users/${nickname}`);
    data = res.data;
  } catch (err) {
    data = err.response.data;
  }

  dispatch({
    type: TAKE_USERS_INFO,
    payload: data
  });
};
