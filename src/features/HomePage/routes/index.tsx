import { Container, Grid } from "@mui/material";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSidebar";

export const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <LeftSideBar />
        </Grid>

        <Grid item xs={9}>
          <RightSideBar />
        </Grid>
      </Grid>
    </Container>
  );
};
