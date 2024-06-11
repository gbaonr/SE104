import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const updateUsersApi = async (data: User) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + `/api/v1/users/update-user-info/${data.user_id}`;

  return handleApiResponse(axios.put(endpoint, data));
};
