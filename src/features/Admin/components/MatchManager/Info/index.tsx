import { Box, Container, Typography } from "@mui/material";
import { Match } from "types/Match";
import { LoadingInfoMatch } from "./LoadingInfo";
import { LoadingGoalMatch } from "./LoadingGoal";

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
