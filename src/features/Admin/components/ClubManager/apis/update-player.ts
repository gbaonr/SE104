import axios from "axios";
import { Player } from "./types";
import { updateClientApi } from "libs/api-client";

export const updatePlayerApi = async (player: Player) => {
  updateClientApi();

  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/update-player";

  try {
    const playerID = player.player_id;
    const response = await axios.put(`${endpoint}?playerID=${playerID}`, player);

    if (response?.status === 200) {
      return {
        status: "success",
        message: "Player updated successfully",
        code: response?.status,
      };
    } else {
      return {
        status: "error",
        message: response.data?.toString() || "An error occurred",
        code: response?.status,
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
