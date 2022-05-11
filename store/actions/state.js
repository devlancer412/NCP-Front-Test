import { SET_LOADING, SET_ADDRESS, SET_ERROR, SET_SIGNATURE } from "../types";

export const setLoading = (flag) => (dispatch) => {
  return dispatch({
    type: SET_LOADING,
    payload: flag,
  });
};

export const setError = (err) => async (dispatch) => {
  await dispatch({
    type: SET_ERROR,
    payload: "",
  });

  return dispatch({
    type: SET_ERROR,
    payload: err,
  });
};

export const setAddress = (address) => (dispatch) => {
  return dispatch({
    type: SET_ADDRESS,
    payload: address,
  });
};
