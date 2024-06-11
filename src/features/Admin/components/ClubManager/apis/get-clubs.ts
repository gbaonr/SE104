import axios from "axios";
import { Club } from "./types";

const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/clubs/get-all-clubs";

export const getClubsApiUrl = () => {
  return endpoint;
};

export const getClubsApi = async () => {
  try {
    const response = await axios.get<Club[]>(endpoint);

    return {
      status: "success",
      data: response.data,
      code:  response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get clubs",
      code: error.request?.status,
    };
  }
};
