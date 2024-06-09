import { Container } from "@mui/material";
import HeaderPage from "features/User/components/Layouts/PageHeader";
import { TableMatches } from "../components/TableResults/TableMatches";
import { useEffect, useState } from "react";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import { getMatchesApi } from "features/Admin/components/MatchManager/apis/get-matches";
import { toast } from "react-toastify";

export const ResultsPage = () => {
  const [matches, setMatches] = useState<Match[]>();

  useEffect(() => {
    (async () => {
      const response = await getMatchesApi();

      if (response.status === "success") {
        const data = response.data.filter((match) => match.finish <= Date.now() / 1000);
        setMatches(data);
      } else {
        toast.error(response.message);
      }
    })();
  }, []);

  return (
    <>
      <HeaderPage headerName="Results" />

      <Container>
        <TableMatches mini={false} matches={matches} sortAsc={false} />
      </Container>
    </>
  );
};
