import axios from "axios";

export const getRankingApi = async (asc: boolean) => {
  const endpoint =
    process.env.REACT_APP_BACKEND_URL +
    "/api/v1/ranking/ranking-by-points?desc=" +
    (asc ? "false" : "true");

  try {
    const response = await axios.get<RankingClub[]>(endpoint);

    if ( response?.status !== 200) {
      return {
        status: "error",
        message: "An error occurred while trying to get ranking",
        code:  response?.status,
      };
    }

    return {
      status: "success",
      data: response.data,
      code:  response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get ranking",
      code: error.request?.status,
    };
  }
};
