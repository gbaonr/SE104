import axios from "axios";
import { Match, MatchEvent } from "./types";

export const getEventsMatchApi = async (match: Match) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/events";

  try {
    // TODO: fix filter by match id
    const response = await axios.get<MatchEvent[]>(endpoint);

    if ( response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to get matches",
        code:  response?.status,
      };
    }
    
    response.data = response.data.filter((event) => event.match_id === match.match_id);

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
