import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Match } from "./types";

export const updateMatchApi = async (match: Match) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/update-match";

  return handleApiResponse(axios.put(`${endpoint}?id=${match.match_id}`, match));
};
