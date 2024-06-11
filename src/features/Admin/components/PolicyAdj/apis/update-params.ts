import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { Params } from "./types";

export const updateParamsApi = async (params: Params) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/params/update-params";

  return handleApiResponse(axios.put(endpoint, params));
};
