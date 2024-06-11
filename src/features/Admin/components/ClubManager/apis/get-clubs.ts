import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Club } from "./types";

export const getClubsApi = async (filterManagerId: number = -1) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/clubs/get-all-clubs";

  const response = await handleApiResponse<Club[]>(axios.get(endpoint));

  if (response?.status === "success") {
    if (filterManagerId === -1) {
      return response;
    }

    return {
      status: "success",
      data: response.data.filter((club) => club.manager_id === filterManagerId),
    };
  }

  return response;
};
