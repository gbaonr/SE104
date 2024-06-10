import axios from "axios";
import { MatchEvent } from "./types";

export const deleteEventApi = async (event: MatchEvent) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/events/delete";

  try {
    const eventId = event.event_id;
    const response = await axios.put(
      `${endpoint}?event_id=${eventId}`
    );

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
