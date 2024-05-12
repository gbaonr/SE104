import StadiumIcon from "@mui/icons-material/Stadium";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import HeaderPage from "../../components/Header/PageHeader";

const dataTouraments = {
  "First Team": {
    "Saturday 11 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
    ],
    "Tuesday 7 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
    ],
  },

  PL2: {
    "Sunday 5 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
    ],
    "Saturday 4 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
    ],
  },

  U18: {
    "Friday 3 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
    ],
    "Sunday 28 April 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
      },
    ],
  },
};

const TeamItem = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  color: "#37003c",
}));

export default function ResultsPage() {
  const [selectedTournament, setSelectedTournament] =
    useState<string>("First Team");

  const tournaments = ["First Team", "PL2", "U18"];

  const handleChangeTournament = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedTournament(newValue);
  };

  return (
    <>
      <HeaderPage headerName="Results" />

      <Container>
        <TabContext value={selectedTournament}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTournament}
              aria-label="lab API tabs example"
            >
              {tournaments.map((tournament, index) => (
                <Tab key={index} label={tournament} value={tournament} />
              ))}
            </TabList>
          </Box>

          {tournaments.map((tournament, index) => (
            <TabPanel key={index} value={tournament}>
              {Object.keys(dataTouraments[tournament]).map((date, index) => (
                <Box
                  key={index}
                  sx={{
                    my: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{ fontWeight: 900, fontSize: "1.2rem" }}
                    >
                      {date}
                    </Typography>

                    <img
                      src="assets/images/main/competition_1.png"
                      alt="competition"
                      style={{ height: "30px" }}
                    />
                  </Box>

                  {dataTouraments[tournament][date].map((game, index) => (
                    <Grid
                      container
                      spacing={0}
                      key={index}
                      sx={{
                        my: 2,
                        py: 1,
                        "&:hover": {
                          background:
                            "linear-gradient(98.5deg, #05f0ff -46.16%, #7367ff 42.64%, #963cff 70.3%);",
                        },
                      }}
                      className="flex items-center"
                    >
                      <Grid item xs={2}>
                        <TeamItem>{game.team}</TeamItem>
                      </Grid>

                      <Grid item xs={1}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            backgroundColor: "#37003c",
                            fontWeight: 700,
                            color: "white",
                            borderRadius: "5px",
                            py: 1,
                          }}
                        >
                          {game.score}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <TeamItem>{game.opponent}</TeamItem>
                      </Grid>

                      <Grid item xs={2}>
                        {" "}
                      </Grid>

                      <Grid item xs={5} className="flex items-center">
                        <StadiumIcon />

                        <Typography
                          sx={{
                            color: "#37003c",
                            fontSize: "0.8rem",
                            mx: 2,
                          }}
                        >
                          {game.location}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              ))}
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </>
  );
}
