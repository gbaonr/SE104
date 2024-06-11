import axios from "axios";
import { Player } from "./types";

export const deletePlayerApi = async (filterPlayer: Player) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/delete_player";

  try {
    const playerId = filterPlayer.player_id;
    const response = await axios.put(`${endpoint}`, {
      playerID: playerId,
    });

    return {
      status: "success",
      data: response.data,
      code:  response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to delete player",
      code: error.request?.status,
    };
  }
};
