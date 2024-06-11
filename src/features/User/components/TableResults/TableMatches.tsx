import { Box, Divider, Grid, MenuItem, Switch, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TeamItem } from "components/Items/ClubItem";
import { ScoreItem } from "components/Items/ScoreItem";
import { USER_ROUTES } from "constants/Paths";
import dayjs, { Dayjs } from "dayjs";
import { getClubsApi } from "features/Admin/components/ClubManager/apis/get-clubs";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export type TableResultsProps = {
  mini?: boolean;
  useShortName?: boolean;
  matches: Match[];
  sortAsc?: boolean;
  limit?: number;
};

export const TableMatches = ({
  matches,
  mini,
  useShortName,
  sortAsc,
  limit = 10 ** 9,
}: TableResultsProps) => {
  const [clubs, setClubs] = useState<Club[]>();
  const [filteredData, setFilteredData] = useState<Match[]>();
  const [selectedTeamOne, setSelectedTeamOne] = useState<number>(-1);
  const [selectedTeamTwo, setSelectedTeamTwo] = useState<number>(-1);
  const [respectOrder, setRespectOrder] = useState(true);

  const [startDate, setStartDate] = useState<Dayjs>(dayjs("1970-01-01"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [matchesByDate, setMatchesByDate] = useState<{ date: string; matches: Match[] }[]>();

  useEffect(() => {
    if (!matches) return;

    setFilteredData(
      matches.filter((match) => {
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
  }, [selectedTeamOne, selectedTeamTwo, startDate, endDate, matches, respectOrder]);

  useEffect(() => {
    (async () => {
      const response = await getClubsApi();

      if (response?.status === "success") {
        setClubs(response.data);
      } 
    })();
  }, []);

  useEffect(() => {
    setFilteredData(matches);
  }, [matches]);

  useEffect(() => {
    if (!filteredData) return;

    const uniqueDates = Array.from(
      new Set(filteredData.map((match) => dayjs.unix(match.start).format("DD/MM/YYYY"))),
    );

    const matchesByDate = uniqueDates.map((date) => ({
      date,
      matches:
        filteredData.filter((match) => dayjs.unix(match.start).format("DD/MM/YYYY") === date) || [],
    }));

    if (sortAsc) {
      setMatchesByDate(
        matchesByDate.sort((a, b) => dayjs(a.date, "DD/MM/YYYY").diff(dayjs(b.date, "DD/MM/YYYY"))),
      );
    } else {
      setMatchesByDate(
        matchesByDate.sort((a, b) => dayjs(b.date, "DD/MM/YYYY").diff(dayjs(a.date, "DD/MM/YYYY"))),
      );
    }
  }, [filteredData, sortAsc]);

  return (
    <>
      {!mini && (
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
            {clubs &&
              clubs.map((club) => (
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
            {clubs &&
              clubs.map((club) => (
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
            <Switch checked={respectOrder} onChange={(e) => setRespectOrder(e.target.checked)} />
          </Box>
        </Box>
      )}

      {matchesByDate &&
        matchesByDate.map((matchByDate, index) => {
          if (index >= limit) return null;

          return (
            <>
              {index !== 0 && <Divider />}

              <Box
                sx={{
                  my: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: mini ? "center" : "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: mini ? 700 : 900,
                      fontSize: mini ? "1rem" : "1.2rem",
                      margin: "0.3rem",
                    }}
                  >
                    {matchByDate.date}
                  </Typography>

                  {!mini && (
                    <img
                      src="/assets/images/main/competition_1.png"
                      alt="competition"
                      style={{ height: "30px" }}
                    />
                  )}
                </Box>

                {matchByDate.matches.map((match, index) => (
                  <Link to={`${USER_ROUTES.MATCH_INFO}/${match.match_id}`}>
                    <Grid
                      container
                      spacing={0}
                      sx={{
                        my: 0.2,
                        py: (mini && 0) || 1,
                        display: "flex",
                        justifyContent: "center",
                        "&:hover": {
                          background:
                            "linear-gradient(98.5deg, #05f0ff -46.16%, #948bff 42.64%, #bf8afb 70.3%);",
                        },
                      }}
                      className="flex items-center"
                    >
                      <Grid item xs={mini ? 4 : 3}>
                        <TeamItem
                          useShortName={useShortName}
                          club={clubs?.find((club) => club.club_id === match.team1)}
                        />
                      </Grid>

                      <Grid item xs={mini ? 4 : 1}>
                        <Box sx={{ mx: 2 }}>
                          <ScoreItem match={match} />
                        </Box>
                      </Grid>

                      <Grid item xs={mini ? 4 : 3}>
                        <TeamItem
                          useShortName={useShortName}
                          leftLogo={true}
                          club={clubs?.find((club) => club.club_id === match.team2)}
                        />
                      </Grid>

                      {/* {!props.mini && (
                <Grid item xs={2}>
                  {" "}
                </Grid>
              )} */}

                      {/* {!props.mini && (
                <Grid item xs={5} className="flex items-center">
                  <StadiumIcon />

                  <Typography
                    sx={{
                      color: "#37003c",
                      fontSize: "0.8rem",
                      mx: 2,
                    }}
                  >
                    {match.location}
                  </Typography>
                </Grid>
              )} */}
                    </Grid>
                  </Link>
                ))}
              </Box>
            </>
          );
        })}
    </>
  );
};
