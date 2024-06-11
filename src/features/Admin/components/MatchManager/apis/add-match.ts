import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Match } from "./types";

export const addMatchApi = async (match: Match) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/matches/add-match";

  return handleApiResponse(axios.post(endpoint, match));
};
