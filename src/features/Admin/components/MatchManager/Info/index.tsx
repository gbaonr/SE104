import { Container } from "@mui/material";
import { Match } from "types/Match";
import { LoadingGoalMatch } from "./LoadingGoal";
import { LoadingInfoMatch } from "./LoadingInfo";

type MatchDetailInfoProps = {
  match: Match;
};

export const MatchDetailInfo = ({ match }: MatchDetailInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingInfoMatch match={match} />

      {match.finished && (
        <LoadingGoalMatch match={match} />
      )}
    </Container>
  );
};
