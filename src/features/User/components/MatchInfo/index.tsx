import HeaderPage from "features/User/components/Layouts/PageHeader";
import { Container } from "@mui/material";
import { SummaryMatch } from "./LoadSummary";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { useEffect, useState } from "react";
import { getClubsApi } from "features/Admin/components/ClubManager/apis/get-clubs";
import { toast } from "react-toastify";

type MatchInfoUserPageProps = {
  match: Match;
};

export const MatchInfoUserPage = ({ match }: MatchInfoUserPageProps) => {
  const [clubs, setClubs] = useState<Club[]>([]);

  const fetchClubs = async () => {
    const response = await getClubsApi();

    if ( response?.status === "success") {
      setClubs(response.data);
    } else {
      toast.error("Failed to load clubs");
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <>
      <HeaderPage headerName="Results" />

      <Container>
        <SummaryMatch match={match} clubs={clubs} />
      </Container>
    </>
  );
};
