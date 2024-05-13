import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Grid, Tab, Typography } from "@mui/material";
import { useState } from "react";
import HeaderPage from "../../../components/Header/PageHeader";
import { dataLeaderboardTeams } from "../constants/LeaderboardTeams";
import { TeamItem } from "components/TableMatches/TableMatches";
import { Team } from "types";

export type ColumnProps = {
  width?: number;
  header: string;
  centering?: boolean | true;
  field: string;
};

const columns: ColumnProps[] = [
  { width: 1, header: "#", field: "currentPosition" },
  { width: 5, header: "Team", field: "team" },
  { width: 1, header: "MP", field: "matchesPlayed" },
  { width: 1, header: "W", field: "wins" },
  { width: 1, header: "D", field: "draws" },
  { width: 1, header: "L", field: "losses" },
  { width: 1, header: "GF", field: "goalsFor" },
  { width: 1, header: "GA", field: "goalsAgainst" },
  { width: 1, header: "GD", field: "goalDifference" },
  { width: 1, header: "PTS", field: "points" },
  { width: 5, header: "Form", field: "recentMatches" },
  { width: 1, header: "Next", field: "nextMatch" },
];

export const LeaderBoard = () => {
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

          {Object.keys(dataLeaderboardTeams).map((tournament, index) => (
            <TabPanel key={index} value={tournament}>
              <Grid
                columns={{ lg: columns.reduce((acc, column) => acc + column.width, 0) }}
                container
                key={index}
                spacing={2}
              >
                {columns.map((column, index) => (
                  <Grid item key={index} xs={column.width}>
                    {column.header}
                  </Grid>
                ))}

                {dataLeaderboardTeams[tournament].map((team, index) =>
                  columns.map((column, index) => {
                    return (
                      <Grid item key={index} xs={column.width}>
                        {column.field === "team" ? (
                          <TeamItem leftLogo={true} team={team[column.field] as Team} />
                        ) : column.field === "recentMatches" ? (
                          <Typography>aff</Typography>
                        ) : column.field === "nextMatch" ? (
                          <Typography>Next</Typography>
                        ) : (
                          <Typography>
                            {typeof team[column.field] === "number"
                              ? team[column.field].toString()
                              : "Unsupported type"}
                          </Typography>
                        )}
                      </Grid>
                    );
                  }),
                )}
              </Grid>
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </>
  );
};
