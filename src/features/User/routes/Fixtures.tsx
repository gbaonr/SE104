import HeaderPage from "../components/Layouts/PageHeader";

import { Container } from "@mui/material";
import { dataUpcomingMatches } from "constants/UpcomingMatchResults";
import { TableMatches } from "../components/TableResults/TableMatches";

export const FixturesPage = () => {
  return (
    <>
      <HeaderPage headerName="Results" />

      <Container>
        <TableMatches mini={false} data={dataUpcomingMatches} />
      </Container>
    </>
  );
};
