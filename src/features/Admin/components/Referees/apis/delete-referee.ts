import axios from "axios";
import { Referee } from "../../MatchManager/apis/types";
import { handleApiResponse } from "libs/api-client";

export const deleteRefereeApi = async (referee: Referee) => {
  const endpoint = process.env.REACT_APP_BACKEND_URL + "/api/v1/referees/delete-ref?ref_id=" + referee.ref_id;

  return handleApiResponse(axios.put(endpoint, referee));
};
