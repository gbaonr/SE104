import axios from "axios";
import { Match } from "./types";

export const deleteMatchApi = async (match: Match) => {
  try {
    const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/delete-match";
    const response = await axios.put(`${endpoint}?id=${match.match_id}`, match);

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
