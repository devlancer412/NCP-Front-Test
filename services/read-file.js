import axios from "axios";

export const url2blob = async (url) => {
  try {
    const config = { responseType: "blob" };
    const response = await axios.get(url, config);
    return response.data;
  } catch (err) {
    console.error(err.name, err.message);
  }
};

export const blobToFile = (theBlob, fileName) => {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};
