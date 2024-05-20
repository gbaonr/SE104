import { Container } from "@mui/material";
import { Team } from "types/Team";
import { Articles } from "./Articles";
import { ListPlayerTeam } from "./RegisterTeam";

type TeamDetailInfoProps = {
  team: Team;
};

export const TeamDetailInfo = ({ team }: TeamDetailInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TODO: handle articles for each team */}
      <Articles team={team} />

      {/* register teams */}
      <ListPlayerTeam team={team} />
    </Container>
  );
};
