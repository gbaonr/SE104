import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TeamItem } from "components/Items/ClubItem";
import { ADMIN_ROUTES } from "constants/Paths";
import { teamsInfo } from "constants/Teams";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Match } from "types/Match";

const upCommingMatchesColumns = [
  { id: "id", header: "#", width: 1 },
  { id: "date", header: "Date", width: 2 },
  { id: "time", header: "Time", width: 1 },
  { id: "team", header: "Team", width: 2 },
  { id: "opponent", header: "Opponent", width: 2 },
  { id: "location", header: "Location", width: 2 },
];

type LoadingMatchesProps = {
  data: Match[];
  header: string;
};

export const LoadingMatches = ({ data, header }: LoadingMatchesProps) => {
  const [selectedTeamOne, setSelectedTeamOne] = useState<string>("All");
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<string>("All");

  const [startDate, setStartDate] = useState<Dayjs>(dayjs("1970-01-01"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((match) => {
        const teamOne = selectedTeamOne === "All" || match.team.name === selectedTeamOne;
        const teamTwo = selectedTeamTwo === "All" || match.opponent.name === selectedTeamTwo;
        const isAfterStartDate = dayjs(match.date).isAfter(startDate);
        const isBeforeEndDate = dayjs(match.date).isBefore(endDate);

        return teamOne && teamTwo && isAfterStartDate && isBeforeEndDate;
      }),
    );
  }, [selectedTeamOne, selectedTeamTwo, startDate, endDate]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        my: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1.7rem",
          color: "#37003c",
          mb: 4,
        }}
      >
        {header}
      </Typography>

      {/* loading filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          alignContent: "center",
        }}
      >
        {/* Team 1 */}
        <TextField
          value={selectedTeamOne}
          sx={{ mr: 2 }}
          select
          label="Team 1"
          onChange={(e) => setSelectedTeamOne(e.target.value as string)}
        >
          {Object.keys(teamsInfo).map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
          <MenuItem value="All">All</MenuItem>
        </TextField>

        {/* Team 2 */}
        <TextField
          value={selectedTeamTwo}
          sx={{ mr: 2 }}
          select
          label="Team 2"
          onChange={(e) => setSelectedTeamTwo(e.target.value as string)}
        >
          {Object.keys(teamsInfo).map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
          <MenuItem value="All">All</MenuItem>
        </TextField>

        {/* date filtering */}
        <Box sx={{ mr: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date as Dayjs)}
                views={["day", "month", "year"]}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Box sx={{ mr: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date as Dayjs)}
                views={["day", "month", "year"]}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>

      {/* loading matches */}
      <Box
        sx={{
          mt: 4,
        }}
      >
        <Grid
          container
          columns={{ xs: upCommingMatchesColumns.reduce((acc, column) => acc + column.width, 0) }}
        >
          {/* load header */}
          {upCommingMatchesColumns.map((column) => (
            <Grid
              item
              xs={column.width}
              sx={{
                border: "1px solid #f0f0f0",
                p: "0.5rem !important",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {column.header}
            </Grid>
          ))}

          {/* load data */}
          {filteredData.map((match) => (
            <>
              {upCommingMatchesColumns.map((column) => {
                if (column.id === "team" || column.id === "opponent") {
                  return (
                    <Grid
                      item
                      xs={column.width}
                      sx={{
                        border: "1px solid #f0f0f0",
                        p: "0.5rem !important",
                        "&:hover": {
                          background:
                            "linear-gradient(98.5deg, #05f0ff -46.16%, #948bff 42.64%, #bf8afb 70.3%);",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        component={Link}
                        to={ADMIN_ROUTES.MATCH + "/" + match.id}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                          height: "100%",
                          display: "block",
                        }}
                      >
                        <TeamItem team={match[column.id]} leftLogo={true} />
                      </Box>
                    </Grid>
                  );
                }

                return (
                  <Grid
                    item
                    xs={column.width}
                    sx={{
                      border: "1px solid #f0f0f0",
                      p: "0.5rem !important",
                      textAlign: "center",
                      "&:hover": {
                        background:
                          "linear-gradient(98.5deg, #05f0ff -46.16%, #948bff 42.64%, #bf8afb 70.3%);",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component={Link}
                      to={ADMIN_ROUTES.MATCH + "/" + match.id}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                    >
                      {match[column.id]}
                    </Box>
                  </Grid>
                );
              })}
            </>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
