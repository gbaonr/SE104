import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Player } from "./types";

export const deletePlayerApi = async (filterPlayer: Player) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/delete-player";

  return handleApiResponse(
    axios.put(`${endpoint}`, {
      playerID: filterPlayer.player_id,
    }),
  );
};
