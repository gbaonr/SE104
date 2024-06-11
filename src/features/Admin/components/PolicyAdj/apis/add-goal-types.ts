import axios from "axios";
import { handleApiResponse } from "libs/api-client";
import { GoalType } from "./types";

export const addGoalTypesApi = async (goalType: GoalType) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/goaltypes/add-types?new_type=${goalType.type_name}`;

  return handleApiResponse(axios.post(`${endpoint}`, goalType));
};
