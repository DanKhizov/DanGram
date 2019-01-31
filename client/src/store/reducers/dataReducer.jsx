import { TAKE_USERS_INFO } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TAKE_USERS_INFO:
      return action.payload;

    default:
      return state;
  }
};
