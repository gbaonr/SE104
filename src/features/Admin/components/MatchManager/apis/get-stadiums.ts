import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Stadium } from "./types";

export const getStadiumsApi = async () => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/stadiums/get-all-stadiums";

  return handleApiResponse<Stadium>(axios.get(endpoint));
};
