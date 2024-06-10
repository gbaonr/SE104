import axios from "axios";
import { Referee } from "./types";

export const getRefereesApi = async () => {
  try {
    const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/referees/get-all";
    const response = await axios.get<Referee[]>(endpoint);

    if ( response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to get referees",
        code:  response?.status,
      };
    }

    return {
      status: "success",
      data: response.data,
      code:  response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get referees",
      code: error.request?.status,
    };
  }
};
