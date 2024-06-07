import { Container } from "@mui/material";
import { LoadingUsers } from "./UserManager";

export const UserManagement = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingUsers />
    </Container>
  );
};
