import axios from "axios";
import { Player } from "./types";

export const updatePlayerApi = async (player: Player) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/update_player";

  try {
    const playerID = player.player_id;
    const response = await axios.put(`${endpoint}?playerID=${playerID}`, player);

    if ( response?.status === 200) {
      return {
        status: "success",
        message: "Player updated successfully",
        code:  response?.status,
      };
    } else {
      return {
        status: "error",
        message: "An error occurred while trying to update player",
        code:  response?.status,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to update player",
      code: error.request?.status,
    };
  }
};
