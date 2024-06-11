import axios from "axios";
import { Referee } from "../../MatchManager/apis/types";
import { handleApiResponse } from "libs/api-client";

export const addRefereeApi = async (referee: Referee) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/referees/add-refs";

  return handleApiResponse(axios.post(endpoint, referee));
};
