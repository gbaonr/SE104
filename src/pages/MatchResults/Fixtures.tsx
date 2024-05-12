import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Container } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import HeaderPage from "../../components/Header/PageHeader";
import TableMatches from "./Base";
import { MatchesByDate } from "./Base";

const dataTouraments: { [tournament: string]: MatchesByDate } = {
  "First Team": {
    "Saturday 11 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
    ],
    "Tuesday 7 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
    ],
  },
  PL2: {
    "Sunday 5 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
    ],
  },
  U18: {
    "Friday 3 May 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
    ],
    "Sunday 28 April 2024": [
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
      {
        team: "Arsenal",
        opponent: "Chelsea",
        result: "W",
        score: "",
        location: "Emirates Stadium",
        time: "22:10",
        finsihed: false,
      },
    ],
  },
};

export default function FixturesPage() {
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
            <TabList onChange={handleChangeTournament}>
              {tournaments.map((tournament, index) => (
                <Tab key={index} label={tournament} value={tournament} />
              ))}
            </TabList>
          </Box>

          {tournaments.map((tournament, index) => (
            <TabPanel key={index} value={tournament}>
              <TableMatches {...dataTouraments[tournament]} />
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </>
  );
}
