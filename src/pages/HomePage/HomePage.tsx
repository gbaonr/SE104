import { Container, Grid } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSidebar";

export default function HomePage() {
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
}
