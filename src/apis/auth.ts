import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BACKEND_URL);

export const loginApi = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/token`, formData);
    return {
      status: "success",
      data: response.data,
      code: response.status,
    };
  } catch (error) {
    // get type of error.request.status
    console.log(typeof error.request.status);

    if (error.request.status === 401) {
      return {
        status: "error",
        message: "Invalid username or password",
        code: error.request.status,
      };
    }

    return {
      status: "error",
      message: "An error occurred while trying to login",
      code: error.request.status,
    };
  }
};
