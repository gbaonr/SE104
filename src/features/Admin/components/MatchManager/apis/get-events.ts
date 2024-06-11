import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Match, MatchEvent } from "./types";

export const getEventsMatchApi = async (match: Match) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/events/get-events-of-match";

  return handleApiResponse<MatchEvent[]>(axios.get(`${endpoint}?match_id=${match.match_id}`));
};
