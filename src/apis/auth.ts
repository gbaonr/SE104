import axios from "axios";
import { handleApiResponse } from "libs/api-client";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const loginApi = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/token`, formData);

    if (response?.status !== 200 || response.data?.status === "error") {
      return {
        status: "error",
        message: response.data?.message.toString() || "An error occurred",
      };
    }

    return {
      status: "success",
      data: response.data,
      code: response?.status,
    };
  } catch (error) {
    if (error.request?.status === 401) {
      return {
        status: "error",
        message: "Invalid username or password",
        code: error.request?.status,
      };
    }

    return {
      status: "error",
      message: "An error occurred while trying to login",
      code: error.request?.status,
    };
  }

  // const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/token";
  // return handleApiResponse(axios.post(endpoint, formData));
};
