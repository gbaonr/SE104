import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const getParamsApi = async () => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/params/show-params/`;

  return handleApiResponse(axios.get(endpoint));
};
