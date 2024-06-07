import axios from "axios";

export const deleteUserApi = async (userToFilter: User) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/users/create-user";

  try {
    const userId = userToFilter.user_id;

    if (!userId) {
      return {
        status: "error",
        message: "User ID is required",
        code: 400,
      };
    }

    const response = await axios.put(`${endpoint}/${userId}`);

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
