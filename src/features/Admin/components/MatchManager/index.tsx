import { Container } from "@mui/material";
import { dataDoneMatches } from "constants/DoneMatchResults";
import { dataUpcomingMatches } from "constants/UpcomingMatchResults";
import { LoadingMatches } from "./LoadingMatches";

export const MatchManger = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingMatches data={dataUpcomingMatches} header="Upcoming Matches" />
      <LoadingMatches data={dataDoneMatches} header="Done Matches" />
    </Container>
  );
};
