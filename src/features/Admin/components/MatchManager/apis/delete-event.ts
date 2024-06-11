import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { MatchEvent } from "./types";

export const deleteEventApi = async (event: MatchEvent) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/events/delete";

  return handleApiResponse(axios.put(`${endpoint}?event_id=${event.event_id}`));
};
