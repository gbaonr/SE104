import axios from "axios";
import { MatchEvent } from "./types";

export const addEventMatchApi = async (event: MatchEvent) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/events/add";

  try {
    const payload = {
      match_id: event.match_id,
      events: event.events,
      seconds: event.seconds,
      team_id: event.team_id,
      player_id: event.player_id,
    };

    const response = await axios.post(endpoint, payload);

    if ( response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to add event",
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
      message: "An error occurred while trying to add event",
      code: error.request?.status,
    };
  }
};
