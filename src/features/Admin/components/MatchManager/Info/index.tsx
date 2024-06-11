import { Container } from "@mui/material";
import { Club } from "../../ClubManager/apis/types";
import { Match } from "../apis/types";
import { LoadingGoalMatch } from "./LoadingGoal";
import { LoadingInfoMatch } from "./LoadingInfo";
import LoadingPlayerMatch from "./LoadPlayer";

type MatchDetailInfoProps = {
  match: Match;
  clubs: Club[];
  setForceUpdate: (value: number) => void;
};

export const MatchDetailInfo = ({ match, clubs, setForceUpdate }: MatchDetailInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingInfoMatch clubs={clubs} match={match} setForceUpdate={setForceUpdate} />
      <LoadingGoalMatch match={match} clubs={clubs} setForceUpdate={setForceUpdate} />

      {/* <LoadingPlayerMatch match={match} /> */}
    </Container>
  );
};
