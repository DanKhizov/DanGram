import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, SET_2FA_UUID } from "./types";
import setAuthHeader from "../../setAuthHeader";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => async dispatch => {
	try {
		await axios.post("/api/auth/register", user);
		history.push("/login");
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		});
	}
};

export const tryLoginUser = user => async dispatch => {
	try {
		const res = await axios.post("/api/auth/login", user);
		const { token, uuid } = res.data;

		if (token && !uuid) {
			localStorage.setItem("jwtToken", token);
			setAuthHeader(token);

			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		}

		if (!token && uuid) {
			dispatch(setUuidUser(uuid));
		}
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		});
	}
};

export const setUuidUser = uuid => {
	return {
		type: SET_2FA_UUID,
		payload: uuid,
	};
};

export const setCurrentUser = (decoded = {}) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setAuthHeader(false);
	dispatch(setCurrentUser());
};
