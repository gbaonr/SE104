import { Container } from "@mui/material";
import { Team } from "types/Team";
import { Articles } from "./Articles";
import { ListPlayerTeam } from "./RegisterTeam";
import { HeaderClubInfo } from "./Header";

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
      <HeaderClubInfo team={team} />

      {/* TODO: handle articles for each team */}
      <Articles team={team} />

      {/* register teams */}
      <ListPlayerTeam team={team} />
    </Container>
  );
};
