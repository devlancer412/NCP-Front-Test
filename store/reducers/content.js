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

const initialState = {
  name: "",
  contentId: "",
  description: "",
  blobs: [
    {
      name: "banner-image",
      link: "",
      type: "Image",
      protected: false,
      editable: false,
    },
    {
      name: "trailer",
      link: "",
      type: "Video",
      protected: false,
      editable: false,
    },
  ],
  finished: false,
  signatured: false,
};

const contentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CONTENT_NAME:
      return { ...state, name: payload };
    case SET_CONTENT_ID:
      return { ...state, contentId: payload };
    case SET_CONTENT_DESCRIPTION:
      return { ...state, description: payload };
    case SET_BLOBS:
      return { ...state, blobs: payload };
    case ADD_BLOB:
      return { ...state, blobs: [...state.blobs, payload] };
    case REMOVE_BLOB:
      return {
        ...state,
        blobs: state.blobs.filter((item, index) => index != payload),
      };
    case UPDATE_BLOB:
      return {
        ...state,
        blobs: state.blobs.map((item, index) =>
          index == payload.index ? payload.item : item
        ),
      };
    case UPDATE_BLOB_LINK:
      return {
        ...state,
        blobs: state.blobs.map((item, index) =>
          index == payload.index ? { ...item, link: payload.link } : item
        ),
      };
    case CLEAR_CONTENT:
      return initialState;
    case SET_FINISHED:
      return { ...state, finished: true };
    case SET_SIGNATURED:
      return { ...state, signatured: true };
    default:
      return state;
  }
};

export default contentReducer;
