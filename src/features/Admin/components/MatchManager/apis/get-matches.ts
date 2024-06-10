import axios from "axios";
import { Match } from "./types";

const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/get-matches";

export const getMatchesApiUrl = () => {
  return endpoint;
}

export const getMatchesApi = async () => {
  try {
    const response = await axios.get<Match[]>(endpoint);

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
