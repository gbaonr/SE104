import { Container } from "@mui/material";
import { Match } from "types/Match";

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
    ></Container>
  );
};
