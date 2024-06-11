import axios from "axios";
import { Player } from "./types";

export const addPlayerApi = async (player: Player) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/add_players";

  try {
    const response = await axios.post(`${endpoint}`, player);

    if ( response?.status === 200) {
      return {
        status: "success",
        message: "Player added successfully",
        code:  response?.status,
      };
    } else {
      return {
        status: "error",
        message: "An error occurred while trying to add player",
        code:  response?.status,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to add player",
      code: error.request?.status,
    };
  }
};
