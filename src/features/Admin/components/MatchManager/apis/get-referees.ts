import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Referee } from "./types";

export const getRefereesApi = async () => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/referees/get-all";

  return handleApiResponse<Referee[]>(axios.get(endpoint));
};
