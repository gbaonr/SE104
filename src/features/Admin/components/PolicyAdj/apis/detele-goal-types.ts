import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { GoalType } from "./types";

export const deleteGoalTypesApi = async (goalType: GoalType) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/goaltypes/delete-types?type_id=${goalType.type_id}`;

  return handleApiResponse(axios.put(endpoint));
};
