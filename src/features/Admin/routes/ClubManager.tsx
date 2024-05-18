import { teamsInfo } from "constants/Teams";
import { ClubManager } from "../components/ClubManager";

export const ClubManagerRoute = () => {
  return (
    <>
      <ClubManager data={teamsInfo} />
    </>
  );
};
