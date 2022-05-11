import axios from "axios";

export default axios.create({
  baseURL: "https://content-player-web3.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
});
