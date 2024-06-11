import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const getGoalTypesApi = async () => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/goaltypes/get`;

  return handleApiResponse(axios.get(endpoint));
};
