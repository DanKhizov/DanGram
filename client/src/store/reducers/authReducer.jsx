import { SET_CURRENT_USER, SET_2FA_UUID } from "../actions/types";
import isEmpty from "../../isEmpty";

const initialState = {
	isAuthenticated: false,
	uuid: "",
	user: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				uuid: "",
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};

		case SET_2FA_UUID:
			return {
				...state,
				uuid: action.payload,
			};

		default:
			return state;
	}
};
