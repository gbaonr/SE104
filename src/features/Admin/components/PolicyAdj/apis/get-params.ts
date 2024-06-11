import axios from "axios";
import { updateClientApi } from "libs/api-client";
import { Params } from "./types";

export const getParamsApi = async () => {
  updateClientApi();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.get<Params>(`${BACKEND_URL}/api/v1/params/show-params/`);

    return {
      status: "success",
      data: response.data,
      code: response?.status,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while trying to get params",
      code: error.request?.status,
    };
  }
};
