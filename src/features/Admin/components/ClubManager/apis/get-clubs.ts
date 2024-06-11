import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Club } from "./types";

export const getClubsApi = async () => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/clubs/get-all-clubs";
  return handleApiResponse<Club[]>(axios.get(endpoint));
};
