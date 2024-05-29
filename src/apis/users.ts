import axios from "axios";
import { User } from "types/User";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getUserInfo = async () => {
  try {
    const response = await axios.get<User>(`${BACKEND_URL}/api/v1/users/me`);

    return {
      status: "success",
      data: response.data,
      code: response.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get user info",
      code: error.request.status,
    };
  }
};
