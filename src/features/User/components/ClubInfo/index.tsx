import { Container } from "@mui/material";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { LoadPlayersClubPage } from "./LoadPlayers";

type ClubInfoProps = {
  club: Club;
};

export const ClubInfoPage = ({ club }: ClubInfoProps) => {
  return (
    <Container maxWidth="lg">
      <LoadPlayersClubPage club={club} />
    </Container>
  );
};
