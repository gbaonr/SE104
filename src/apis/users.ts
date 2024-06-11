import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { User } from "types/User";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getUserInfo = async () => {
  const endpoint = `${BACKEND_URL}/api/v1/users/me`;

  return handleApiResponse(axios.get(endpoint), false);
};
