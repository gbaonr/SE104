import axios from "axios";
import { Match } from "./types";
import { Club } from "../../ClubManager/apis/types";

export const getMatchesApi = async (club?: Club) => {
  let endpoint = "";

  if (club) {
    endpoint =
      process.env.REACT_APP_BACKEND_URL +
      `/api/v1/matches/filter-matches-by-team-name?club=${club.club_name}`;
  } else {
    endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/get-matches";
  }

  try {
    const response = await axios.get<Match[]>(endpoint);

    if (response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to get matches",
        code: response?.status,
      };
    }

    return {
      status: "success",
      data: response.data,
      code: response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get matches",
      code: error.request?.status,
    };
  }
};
