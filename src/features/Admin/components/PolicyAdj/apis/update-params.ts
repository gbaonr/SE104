import axios from "axios";

export type updateParamsQuery = {
  max_club_player?: number;
  max_foreign_player?: number;
  max_goal_time?: string;
  max_goal_types?: number;
  max_player_age?: number;
  min_club_player?: number;
  min_player_age?: number;
  points_draw?: number;
  points_lose?: number;
  points_win?: number;
};

export const updateParamsApi = async (params: updateParamsQuery) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.put(`${BACKEND_URL}/api/v1/params/update-params`, params);

    return {
      status: "success",
      data: response.data,
      code:  response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to update params",
      code: error.request?.status,
    };
  }
};
