import { SET_LOADING, SET_ERROR, SET_ADDRESS, SET_SIGNATURE } from "../types";

const initialState = {
  isLoading: false,
  error: null,
  address: "",
};

const stateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_ADDRESS:
      return { ...state, address: payload };
    default:
      return state;
  }
};

export default stateReducer;
