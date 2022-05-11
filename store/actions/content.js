import Router from "next/router";
import axios from "../../utils/http-comon";
import stringify from "qs-stringify";

import {
  SET_CONTENT_NAME,
  SET_CONTENT_ID,
  SET_BLOBS,
  ADD_BLOB,
  REMOVE_BLOB,
  UPDATE_BLOB,
  UPDATE_BLOB_LINK,
  CLEAR_CONTENT,
  SET_CONTENT_DESCRIPTION,
  SET_FINISHED,
  SET_SIGNATURED,
} from "../types";

import { setError, setLoading } from "./state";
import { newContentCreate } from "./web3-api";
import { url2blob } from "../../services/read-file";

export const setContentName = (name) => (dispatch) => {
  return dispatch({
    type: SET_CONTENT_NAME,
    payload: name,
  });
};

export const setContentId = (contentId) => (dispatch) => {
  return dispatch({
    type: SET_CONTENT_ID,
    payload: contentId,
  });
};

export const setContentDescription = (description) => (dispatch) => {
  return dispatch({
    type: SET_CONTENT_DESCRIPTION,
    payload: description,
  });
};

export const addBlob = (item) => (dispatch) => {
  return dispatch({
    type: ADD_BLOB,
    payload: item,
  });
};

export const updateBlob = (index, item) => (dispatch) => {
  return dispatch({
    type: UPDATE_BLOB,
    payload: {
      index,
      item,
    },
  });
};

export const updateBlobLink = (index, link) => (dispatch) => {
  return dispatch({
    type: UPDATE_BLOB_LINK,
    payload: {
      index,
      link,
    },
  });
};

export const removeBlob = (index) => (dispatch) => {
  return dispatch({
    type: REMOVE_BLOB,
    payload: index,
  });
};

export const getNewContentId = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await axios.get("/api/content/upload/new/");

    dispatch(setContentId(result.data.content_id));
  } catch (err) {
    if (!err.response) {
      dispatch(setError("Can't reache to server"));
    } else {
      dispatch(setError(err.response.data));
    }
    Router.push("/content");
  }

  dispatch(setLoading(false));
};

const uploadContentBlob = async (contentId, blob) => {
  const blobData = await url2blob(blob.link);
  const file = new File([blobData], `${contentId}-${blob.name}`, {
    type: blobData.type,
    lastModified: new Date(),
  });

  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(
    `/api/content/upload/${contentId}/?name=${blob.name}&private=${blob.protected}&type=${blob.type}&replace=false`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const uploadContentBlobs =
  (name, address, contentId, description, blobs) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
      for (let blob of blobs) {
        await uploadContentBlob(contentId, blob);
      }

      const episodes = blobs
        .filter((ele) => ele.name != "banner" && ele.name != "trailer")
        .map((ele) => ele.name);

      await axios.post(`/api/content/upload/${contentId}/meta/`, {
        name,
        description,
        banner: "banner-image",
        trailer: "trailer",
        episodes,
      });

      const result = await axios.post(
        `/api/content/upload/${contentId}/finish/?owner=${address}`
      );

      console.log("Signature was got:", result.data.signature);

      const newContentResult = await dispatch(
        newContentCreate(result.data.contentId, address, result.data.signature)
      );

      if (!newContentResult) {
        dispatch(setError("Failed content creation"));

        await axios.delete(`/api/content/upload/${contentId}/?name=${name}`);

        dispatch(setLoading(false));
        return;
      }

      dispatch(setSignatured());
      Router.push("/content/new");
    } catch (err) {
      console.log(err);

      await axios.delete(`/api/content/upload/${contentId}/?${name}`);

      if (err && !err.response) {
        dispatch(setError("Can't reache to server"));
      } else if (err && err.response) {
        dispatch(setError(err.response.data));
      } else {
        dispatch(setError("Unknown error"));
      }
    }

    dispatch(setLoading(false));
  };

export const clearContent = () => (dispatch) => {
  dispatch({
    type: CLEAR_CONTENT,
    payload: null,
  });
};

export const setFinished = () => (dispatch) => {
  dispatch({
    type: SET_FINISHED,
    payload: null,
  });
};

export const setSignatured = () => (dispatch) => {
  dispatch({
    type: SET_SIGNATURED,
    payload: null,
  });
};
