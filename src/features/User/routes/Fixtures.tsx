import HeaderPage from "../components/Layouts/PageHeader";

import { Container } from "@mui/material";
import { dataUpcomingMatches } from "constants/UpcomingMatchResults";
import { TableMatches } from "../components/TableResults/TableMatches";
import { useEffect, useState } from "react";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import { getMatchesApi } from "features/Admin/components/MatchManager/apis/get-matches";
import { toast } from "react-toastify";

export const FixturesPage = () => {
  const [matches, setMatches] = useState<Match[]>();

  useEffect(() => {
    (async () => {
      const response = await getMatchesApi();

      if ( response?.status === "success") {
        const data = response.data.filter(
          (match) => match.start >= Date.now() / 1000 || match.finish === 2 * 10 ** 9,
        );

        setMatches(data);
      } 
    })();
  }, []);

  return (
    <>
      <HeaderPage headerName="Fixtures" />

      <Container>
        <TableMatches mini={false} matches={matches} sortAsc={true} />
      </Container>
    </>
  );
};
