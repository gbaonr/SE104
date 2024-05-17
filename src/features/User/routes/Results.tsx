import { Container } from "@mui/material";
import HeaderPage from "features/User/components/Layouts/PageHeader";
import { dataDoneMatches } from "constants/DoneMatchResults";
import { TableMatches } from "../components/TableResults/TableMatches";

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
