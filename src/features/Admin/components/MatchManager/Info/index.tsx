import { Container } from "@mui/material";
import { Club } from "../../ClubManager/apis/types";
import { Match } from "../apis/types";
import { LoadingGoalMatch } from "./LoadingGoal";
import { LoadingInfoMatch } from "./LoadingInfo";

type MatchDetailInfoProps = {
  match: Match;
  clubs: Club[];
};

export const MatchDetailInfo = ({ match, clubs }: MatchDetailInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingInfoMatch clubs={clubs} match={match} />
      <LoadingGoalMatch match={match} clubs={clubs} />

      {/* <LoadingPlayerMatch match={match} /> */}
    </Container>
  );
};
