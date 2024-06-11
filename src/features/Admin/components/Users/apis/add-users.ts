import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const addUsersApi = async (data: User) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/users/create-user";

  return handleApiResponse(axios.post(endpoint, data));
};
