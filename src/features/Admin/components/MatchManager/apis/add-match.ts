import axios from "axios";
import { Match } from "./types";

export const addMatchApi = async (match: Match) => {
  try {
    const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/add-match";
    const response = await axios.post(endpoint, match);

    if ( response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to get matches",
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
      message: "An error occurred while trying to get users",
      code: error.request?.status,
    };
  }
};
