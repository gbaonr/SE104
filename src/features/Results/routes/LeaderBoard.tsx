import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Grid, Tab, Typography } from "@mui/material";
import { useState } from "react";
import HeaderPage from "../../../components/Header/PageHeader";
import { dataLeaderboardTeams } from "../constants/LeaderboardTeams";
import { TeamItem } from "components/TableMatches/TableMatches";
import { Team } from "types";
import { RecentMatches } from "../components/RecentMatches";
import { NextMatch } from "../components/NextMatch";

export type ColumnProps = {
  width?: number;
  header: string;
  field: string;
  leftAlign?: boolean;
};

const columns: ColumnProps[] = [
  { width: 1, header: "#", field: "currentPosition" },
  { width: 5, header: "Club", field: "team", leftAlign: true },
  { width: 1, header: "Played", field: "matchesPlayed" },
  { width: 1, header: "Won", field: "wins" },
  { width: 1, header: "Drawn", field: "draws" },
  { width: 1, header: "Lost", field: "losses" },
  { width: 1, header: "GF", field: "goalsFor" },
  { width: 1, header: "GA", field: "goalsAgainst" },
  { width: 1, header: "GD", field: "goalDifference" },
  { width: 1, header: "Points", field: "points" },
  { width: 4, header: "Form", field: "recentMatches" },
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
                  <Grid
                    item
                    key={index}
                    xs={column.width}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: (column.leftAlign && "flex-start") || "center",
                      backgroundColor: "#f0f0f0",
                      py: "0.5rem !important",
                      px: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: "#37003c",
                      }}
                    >
                      {column.header}
                    </Typography>
                  </Grid>
                ))}

                {dataLeaderboardTeams[tournament].map((team, index) =>
                  columns.map((column, index) => {
                    return (
                      <Grid
                        item
                        key={index}
                        xs={column.width}
                        sx={{
                          textAlign: column.field === "team" ? "left" : "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: (column.leftAlign && "flex-start") || "center",
                          borderBottom: "2px solid #f0f0f0",
                          py: "1rem !important",
                          px: "0 !important",
                        }}
                      >
                        {column.field === "team" ? (
                          <TeamItem leftLogo={true} team={team[column.field] as Team} />
                        ) : column.field === "recentMatches" ? (
                          <RecentMatches matches={team[column.field]} />
                        ) : column.field === "nextMatch" ? (
                          <NextMatch match={team[column.field]} />
                        ) : column.field === "points" ? (
                          <Typography
                            sx={{
                              fontWeight: 900,
                              color: "#37003c",
                            }}
                          >
                            {team.points.toString()}
                          </Typography>
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
