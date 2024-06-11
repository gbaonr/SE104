import axios from "axios";
import { Params } from "./types";

export const updateParamsApi = async (params: Params) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.put(`${BACKEND_URL}/api/v1/params/update-params`, params);

    return {
      status: "success",
      data: response.data,
      code: response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to update params",
      code: error.request?.status,
    };
  }
};
