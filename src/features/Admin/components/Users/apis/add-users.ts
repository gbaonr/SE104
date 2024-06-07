import axios from "axios";

export const addUsersApi = async (data: User) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/users/create-user";

  try {
    const response = await axios.post(endpoint, data);

    return {
      status: "success",
      data: response.data,
      code: response.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get users",
      code: error.request.status,
    };
  }
};
