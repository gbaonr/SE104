import axios from "axios";
import { updateClientApi } from "libs/api-client";

export const getRankingApi = async (asc: boolean) => {
  updateClientApi();

  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/ranking/get";

  try {
    const response = await axios.get<RankingClub[]>(endpoint);

    if (response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to get ranking",
        code: response?.status,
      };
    }

    return {
      status: "success",
      data: response.data,
      code: response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get ranking",
      code: error.request?.status,
    };
  }
};
