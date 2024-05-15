import { Container } from "@mui/material";
import HeaderPage from "components/Layouts/PageHeader";
import { TableMatches } from "components/TableResults/TableMatches";
import { dataDoneMatches } from "constants/DoneMatchResults";

export const ResultsPage = () => {
  return (
    <>
      <HeaderPage headerName="Results" />

      <Container>
        <TableMatches mini={false} data={dataDoneMatches} />
      </Container>
    </>
  );
};
