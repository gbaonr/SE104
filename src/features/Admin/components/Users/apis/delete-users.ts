import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const deleteUserApi = async (userToFilter: User) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/users/create-user";
  return handleApiResponse(axios.put(`${endpoint}/${userToFilter.user_id}`));
};
