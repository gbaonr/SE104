import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { MatchEvent } from "./types";

export const addEventMatchApi = async (event: MatchEvent) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/events/add";

  return handleApiResponse(
    axios.post(endpoint, {
      match_id: event.match_id,
      events: event.events,
      seconds: event.seconds,
      team_id: event.team_id,
      player_id: event.player_id,
    }),
  );
};
