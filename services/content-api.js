import axios from "../utils/http-comon";

export const getContentList = async () => {
  try {
    const contents = await axios.get("/api/distributor/");

    return { success: true, data: contents.data };
  } catch (err) {
    if (!err.response) {
      return { success: false, data: "Can't reache to server" };
    } else {
      return { success: false, data: err.response.data };
    }
  }
};

export const getPersonalContentList = async (address) => {
  if (typeof address != "string") {
    return { success: false, data: "Please connect to wallet" };
  }
  if (address.length != 42) {
    return { success: false, data: "Please connect to wallet" };
  }

  try {
    const result = await axios.get(`/api/distributor/${address}/`);

    return { success: true, data: result.data };
  } catch (err) {
    if (!err.response) {
      return { success: false, data: "Can't reache to server" };
    } else {
      return { success: false, data: err.response.data };
    }
  }
};

export const getContentData = async (contentId) => {
  if (!contentId) {
    return { success: false, data: "Please insert correct content id" };
  }

  try {
    const { data } = await axios.get(`/api/content/${contentId}/`);

    return { success: true, data };
  } catch (err) {
    if (!err.response) {
      return { success: false, data: "Can't reache to server" };
    } else {
      return { success: false, data: err.response.data };
    }
  }
};
