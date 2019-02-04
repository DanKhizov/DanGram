import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../../setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => async dispatch => {
  try {
    await axios.post("/api/auth/register", user);
    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = user => async dispatch => {
  try {
    const res = await axios.post("/api/auth/login", user);
    const { token, uniqKey } = res.data;

    if (token && !uniqKey) {
      localStorage.setItem("jwtToken", token);
      localStorage.removeItem("uniqKey");
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    }

    if (!token && uniqKey) {
      localStorage.setItem("uniqKey", uniqKey);
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
