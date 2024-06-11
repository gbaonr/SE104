import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const getRankingApi = async (asc: boolean) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/ranking/get";

  return handleApiResponse<RankingClub[]>(axios.get(endpoint));
};
