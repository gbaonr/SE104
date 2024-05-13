import { Box, Container } from "@mui/material";
import HeaderPage from "../../components/Header/PageHeader";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TableMatches from "../../components/TableResults/Base";
import { useState } from "react";

export default function LeaderBoard() {
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
              <TableMatches mini={false} finished={true} data={dataTouraments[tournament]} />
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </>
  );
}
