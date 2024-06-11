import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Player } from "./types";

export const addPlayerApi = async (player: Player) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/add-players";

  return handleApiResponse(axios.post(`${endpoint}`, player));
};
