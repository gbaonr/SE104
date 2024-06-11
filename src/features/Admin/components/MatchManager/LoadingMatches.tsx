import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Box, Checkbox, Grid, MenuItem, Skeleton, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TeamItem } from "components/Items/ClubItem";
import { ScoreItem } from "components/Items/ScoreItem";
import { ADMIN_ROUTES } from "constants/Paths";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Club } from "../ClubManager/apis/types";
import { Match, Stadium } from "./apis/types";
import { toast } from "react-toastify";
import { getStadiumsApi } from "./apis/get-stadiums";

const upCommingMatchesColumns = [
  { id: "match_id", header: "#", width: 1, needDone: false },
  { id: "team1", header: "Team 1", width: 3, needDone: false },
  { id: "goal", header: "Goal", width: 1, needDone: false },
  { id: "team2", header: "Team 2", width: 3, needDone: false },
  { id: "start", header: "Start", width: 2, needDone: false },
  { id: "finish", header: "Finish", width: 2, needDone: true },
  { id: "stadium", header: "Stadium", width: 2, needDone: false },
  { id: "running", header: "Running", width: 2, needDone: false },
];

type LoadingMatchesProps = {
  data: Match[];
  clubs: Club[];
  header: string;
  isDone?: boolean;
};

export const LoadingMatches = ({
  data,
  clubs,
  header,
  isDone = false,
}: LoadingMatchesProps) => {
  const [selectedTeamOne, setSelectedTeamOne] = useState<number>(-1);
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<number>(-1);

  const [startDate, setStartDate] = useState<Dayjs>(dayjs("1970-01-01"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [filteredData, setFilteredData] = useState(data);
  const [respectOrder, setRespectOrder] = useState(true);
  const [loading, setLoading] = useState(true); // State to track loading
  const [currentDateTime, setCurrentDateTime] = useState(Date.now());

  const [stadiums, setStadiums] = useState<Stadium[]>([]);

  const fetchStadiums = async () => {
    const response = await getStadiumsApi();

    if (response?.status === "success") {
      console.log(response.data);
      setStadiums(response.data);
    }
  };
  // update current time every second
  useEffect(() => {
    fetchStadiums();

    const interval = setInterval(() => {
      setCurrentDateTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate an API call to fetch matches
    setTimeout(() => {
      setFilteredData(data);
      setLoading(false); // Set loading to false once data is fetched
    }, 2000);
  }, [data]);

  useEffect(() => {
    setFilteredData(
      data.filter((match) => {
        const teamOne =
          selectedTeamOne === -1 ||
          match.team1 === selectedTeamOne ||
          (!respectOrder && match.team2 === selectedTeamOne);

        const teamTwo =
          selectedTeamTwo === -1 ||
          match.team2 === selectedTeamTwo ||
          (!respectOrder && match.team1 === selectedTeamTwo);

        const isAfterStartDate = dayjs.unix(match.start).isAfter(startDate);
        const isBeforeEndDate =
          dayjs.unix(match.finish).isBefore(endDate) || match.finish === 2 * 10 ** 9;

        return teamOne && teamTwo && isAfterStartDate && isBeforeEndDate;
      }),
    );
  }, [selectedTeamOne, selectedTeamTwo, startDate, endDate, data, respectOrder]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        my: 1,
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
        <TextField
          value={selectedTeamOne.toString()}
          sx={{ mr: 2 }}
          select
          label="Team 1"
          onChange={(e) => setSelectedTeamOne(parseInt(e.target.value))}
        >
          {clubs.map((club) => (
            <MenuItem key={club.club_id} value={club.club_id}>
              {club.club_name}
            </MenuItem>
          ))}
          <MenuItem value="-1">All</MenuItem>
        </TextField>

        <TextField
          value={selectedTeamTwo.toString()}
          sx={{ mr: 2 }}
          select
          label="Team 2"
          onChange={(e) => setSelectedTeamTwo(parseInt(e.target.value as string))}
        >
          {clubs.map((club) => (
            <MenuItem key={club.club_id} value={club.club_id}>
              {club.club_name}
            </MenuItem>
          ))}
          <MenuItem value="-1">All</MenuItem>
        </TextField>

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

        <Box sx={{ mr: 2, display: "flex", flexDirection: "column" }}>
          <Typography>Respect Order</Typography>
          <Checkbox checked={respectOrder} onChange={(e) => setRespectOrder(e.target.checked)} />
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
          columns={{
            xs: upCommingMatchesColumns
              .filter(
                (c) =>
                  (c.id !== "running" || (c.id === "running" && !isDone)) &&
                  (c.needDone === isDone || !c.needDone),
              )
              .reduce((acc, column) => acc + column.width, 0),
          }}
        >
          {/* load header */}
          {upCommingMatchesColumns.map((column) => {
            if (
              (column.id === "finish" && isDone) ||
              (column.id === "running" && !isDone) ||
              (column.id !== "finish" && column.id !== "running")
            ) {
              return (
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
              );
            }
          })}

          {/* load data or skeletons */}
          {loading
            ? Array.from(new Array(5)).map((_, rowIndex) => (
                <Grid container columns={12} key={rowIndex}>
                  {upCommingMatchesColumns.map((column) => {
                    if (
                      (column.id === "finish" && isDone) ||
                      (column.id === "running" && !isDone) ||
                      (column.id !== "finish" && column.id !== "running")
                    ) {
                      return (
                        <Grid
                          item
                          xs={column.width}
                          sx={{
                            border: "1px solid #f0f0f0",
                            p: "0.5rem !important",
                            textAlign: "center",
                          }}
                          key={column.id}
                        >
                          <Skeleton variant="text" />
                        </Grid>
                      );
                    }
                  })}
                </Grid>
              ))
            : filteredData
                .sort((a, b) => {
                  if (!isDone) return a.start - b.start;

                  return b.start - a.start;
                })
                .map((match, index) => (
                  <>
                    {upCommingMatchesColumns.map((column) => {
                      if (stadiums) {
                        console.log(stadiums.find((stadium) => stadium.std_id === match.stadium));
                      }

                      if (column.id === "finish" && !isDone) return null;
                      if (column.id === "running" && isDone) return null;
                      if (column.id === "team1" || column.id === "team2") {
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
                              to={ADMIN_ROUTES.MATCH + "/" + match.match_id}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                                width: "100%",
                                height: "100%",
                                display: "block",
                              }}
                            >
                              <TeamItem
                                club={clubs.find((club) => club.club_id === match[column.id])}
                                leftLogo={
                                  column.id === "team1"
                                    ? true
                                    : column.id === "team2"
                                      ? false
                                      : false
                                }
                              />
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
                            to={ADMIN_ROUTES.MATCH + "/" + match.match_id}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {column.id === "goal" ? (
                              <ScoreItem match={match} />
                            ) : column.id === "start" || column.id === "finish" ? (
                              dayjs.unix(match[column.id]).format("DD/MM/YYYY - HH:mm")
                            ) : column.id === "match_id" ? (
                              index + 1
                            ) : column.id === "stadium" ? (
                              <Typography>
                                {stadiums &&
                                  stadiums.find((stadium) => stadium.std_id === match.stadium)
                                    ?.std_name}
                              </Typography>
                            ) : column.id === "running" &&
                              Date.now() / 1000 < match.finish &&
                              Date.now() / 1000 > match.start ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                }}
                              >
                                <DirectionsRunIcon />
                                <Typography>
                                  {dayjs
                                    .unix(currentDateTime / 1000 - match.start)
                                    .subtract(8, "hours")
                                    .format("HH:mm:ss")}
                                </Typography>
                              </Box>
                            ) : (
                              match[column.id]
                            )}
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
