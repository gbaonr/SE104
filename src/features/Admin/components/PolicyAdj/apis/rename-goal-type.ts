import axios from "axios";
import { handleApiResponse } from "libs/api-client";

export const renameGoalTypesApi = async (curName: string, newName: string) => {
  const endpoint =
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/goaltypes/rename-type` +
    `?type_name=${curName}&new_name=${newName}`;

  return handleApiResponse(axios.put(endpoint));
};
