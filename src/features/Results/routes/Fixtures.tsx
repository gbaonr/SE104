import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import HeaderPage from "../../../components/Header/PageHeader";

import { Box, Container } from "@mui/material";
import { useState } from "react";
import { TableMatches } from "../../../components/TableMatches/TableMatches";
import { dataMatches } from "../../../constants/MatchResults";

export const FixturesPage = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>("First Team");

  const tournaments = ["First Team", "PL2", "U18"];

  const handleChangeTournament = (event: React.SyntheticEvent, newValue: string) => {
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
              <TableMatches mini={false} data={dataMatches[tournament]} />
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </>
  );
};
