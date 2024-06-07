import axios from "axios";
import { Club, Player } from "./types";

export const getPlayersApi = async (filterClub: Club) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/clubs/get-players-of-clubs";

  try {
    const clubName = filterClub.club_name;
    const response = await axios.get<Player[]>(`${endpoint}/${clubName}`);

    return {
      status: "success",
      data: response.data,
      code: response.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get users",
      code: error.request.status,
    };
  }
};
