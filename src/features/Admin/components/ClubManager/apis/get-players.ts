import axios from "axios";
import { handleApiResponse, updateClientApi } from "libs/api-client";
import { Player } from "./types";

type GetPlayersApiParams = {
  club_name?: string;
};

export const getPlayersApi = async (params: GetPlayersApiParams) => {
  let endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/players/get-players";
  if (Object.keys(params).length > 0) {
    endpoint += "?";
    for (const key in params) {
      endpoint += `${key}=${params[key]}&`;
    }
    endpoint = endpoint.slice(0, -1);
  }

  return handleApiResponse<Player[]>(axios.get(endpoint));
};
