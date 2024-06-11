import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const updateClientApi = () => {
  if (!axios.defaults.headers.common["Authorization"]) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};

export async function handleApiResponse<T>(promise) {
  updateClientApi();

  try {
    const response = await promise;

    if (response.status !== 200 || response.data?.status === "error") {
      toast.error(response.data?.message.toString() || "An error occurred");

      return {
        status: "error",
        message: response.data?.message || "An error occurred",
      };
    }

    return {
      status: "success",
      message: response.data.message?.toString() || "",
      data: response.data.data,
    };
  } catch (error) {
    toast.error(error.response?.data.message?.toString() || "An error occurred");

    return {
      status: "error",
      message: error.response?.data.message?.toString() || "An error occurred",
    };
  }
}
