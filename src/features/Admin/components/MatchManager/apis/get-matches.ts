import axios from "axios";
import { Match } from "./types";
import { Club } from "../../ClubManager/apis/types";
import { handleApiResponse, updateClientApi } from "libs/api-client";

export const getMatchesApi = async (club?: Club) => {
  updateClientApi();

  let endpoint = "";

  if (club) {
    endpoint =
      process.env.REACT_APP_BACKEND_URL +
      `/api/v1/matches/filter-matches-by-team-name?club=${club.club_name}`;
  } else {
    endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/get-matches";
  }

  return handleApiResponse<Match[]>(axios.get(endpoint));
};
