import axios from "axios";

export const updateClientApi = () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};
