import { Container } from "@mui/material";
import { Articles } from "./Articles";
import { ListPlayerTeam } from "./ListPlayers";
import { HeaderClubInfo } from "./Header";
import { Club } from "../apis/types";

type TeamDetailInfoProps = {
  club: Club;
};

export const TeamDetailInfo = ({ club }: TeamDetailInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderClubInfo club={club} />

      {/* TODO: handle articles for each team */}
      <Articles club={club} />

      {/* register teams */}
      <ListPlayerTeam club={club} />
    </Container>
  );
};
