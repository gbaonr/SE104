import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const getUsersApi = async (filter: User) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/users";

  const response = await handleApiResponse(axios.get(endpoint));

  if (filter) {
    response.data = response.data.filter((user) => {
      return (
        (filter.user_id ? user.user_id === filter.user_id : true) &&
        (filter.full_name ? user.full_name === filter.full_name : true) &&
        (filter.role ? user.role === filter.role : true) &&
        (filter.user_name ? user.user_name === filter.user_name : true) &&
        (filter.user_mail ? user.user_mail === filter.user_mail : true) &&
        (filter.user_nation ? user.user_nation === filter.user_nation : true) &&
        (filter.user_bday ? user.user_bday === filter.user_bday : true)
      );
    });
  }

  return response;
};
