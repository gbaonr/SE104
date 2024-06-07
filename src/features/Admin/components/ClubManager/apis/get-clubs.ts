import axios from "axios";
import { Club } from "./types";

export const getClubsApi = async () => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/clubs/get-all-clubs";

  try {
    const response = await axios.get<Club[]>(endpoint);

    return {
      status: "success",
      data: response.data,
      code: response.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get users",
      code: error.request.status,
    };
  }
};
