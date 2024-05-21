import { Container } from "@mui/material";
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
      <LoadingMatches />
    </Container>
  );
};
