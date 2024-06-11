import { Container } from "@mui/material";
import { LoadingReferees } from "./RefereesManager";

export const RefereesManagementPage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingReferees />
    </Container>
  );
};
