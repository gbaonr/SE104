import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ScoreItem } from "components/Items/ScoreItem";
import { ADMIN_ROUTES } from "constants/Paths";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Club } from "../../ClubManager/apis/types";
import { deleteMatchApi } from "../apis/delete-match";
import { getRefereesApi } from "../apis/get-referees";
import { Match, Referee, Stadium } from "../apis/types";
import { updateMatchApi } from "../apis/update-match";
import { validateMatch } from "../utils/validator";
import { getStadiumsApi } from "../apis/get-stadiums";

type LoadingInfoMatchProps = {
  match: Match;
  clubs: Club[];
  setForceUpdate: (value: number) => void;
};

const optionInput = [
  // { id: "team1", name: "Team" },
  // { id: "team2", name: "Opponent" },
  { id: "start", name: "Start" },
  { id: "check_finish", name: "Finished?" },
  { id: "finish", name: "Finish" },
  { id: "ref", name: "Referee" },
  { id: "var", name: "VAR" },
  { id: "lineman", name: "Line" },
  { id: "stadium", name: "Stadium" },
];

export const LoadingInfoMatch = ({ match, clubs, setForceUpdate }: LoadingInfoMatchProps) => {
  const [showEditMatch, setShowEditMatch] = useState<boolean>(false);
  const [matchToEdit, setMatchToEdit] = useState<Match | null>(null);
  const [referees, setReferees] = useState<Referee[]>([]);
  const [isMatchFinished, setIsMatchFinished] = useState<boolean>(false);
  const [currentDateTime, setCurrentDateTime] = useState<number>(Date.now() / 1000);
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (!showEditMatch) {
      setMatchToEdit(null);
      setIsMatchFinished(false);
    } else {
      setIsMatchFinished(match.finish <= Date.now() / 1000);
    }
  }, [showEditMatch, match]);

  useEffect(() => {
    if (match) {
      setIsMatchFinished(match.finish <= Date.now() / 1000);
      setMatchToEdit(match);
    }
  }, [match]);

  useEffect(() => {
    if (isMatchFinished) {
      setMatchToEdit({
        ...matchToEdit,
        finish: Date.now() / 1000,
      });
    }
  }, [isMatchFinished]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(Date.now() / 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getRefereesApi();

      if (response?.status === "success") {
        setReferees(response.data);
      }
    })();
  }, []);

  return (
    <>
      {showEditMatch && matchToEdit && (
        <Dialog open={showEditMatch} onClose={(e) => setShowEditMatch(false)}>
          <DialogTitle>Edit Match</DialogTitle>
          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "check_finish") {
                  value = (
                    <Switch
                      checked={isMatchFinished}
                      onChange={(e) => setIsMatchFinished(e.target.checked)}
                    />
                  );
                } else if (column.id === "team1" || column.id === "team2") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={clubs.find((club) => club.club_id === matchToEdit[column.id])?.club_id}
                      onChange={(e) => {
                        setMatchToEdit({
                          ...matchToEdit,
                          [column.id]: parseInt(e.target.value.toString()),
                        });
                      }}
                    >
                      {clubs.map((club) => (
                        <MenuItem value={club.club_id}>{club.club_name}</MenuItem>
                      ))}
                    </Select>
                  );
                } else if (column.id === "start" || column.id === "finish") {
                  if (!isMatchFinished && column.id === "finish") {
                    return null;
                  }

                  value = (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Date"
                              value={dayjs.unix(matchToEdit[column.id])}
                              views={["day", "month", "year"]}
                              onChange={(newValue) => {
                                console.log(newValue);

                                setMatchToEdit({
                                  ...matchToEdit,
                                  [column.id]: newValue.unix(),
                                });
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["TimePicker"]}>
                            <TimePicker
                              views={["hours", "minutes", "seconds"]}
                              label="Time"
                              value={dayjs.unix(matchToEdit[column.id])}
                              onChange={(newValue) => {
                                console.log(newValue);

                                setMatchToEdit({
                                  ...matchToEdit,
                                  [column.id]: newValue.unix(),
                                });
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  );
                } else if (["ref", "var", "lineman"].includes(column.id)) {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={matchToEdit[column.id]}
                      onChange={(e) => {
                        setMatchToEdit({
                          ...matchToEdit,
                          [column.id]: parseInt(e.target.value),
                        });
                      }}
                    >
                      {referees.map((referee, index) => (
                        <MenuItem value={referee.ref_id}>{referee.ref_name}</MenuItem>
                      ))}
                    </Select>
                  );
                } else if (column.id === "stadium") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={matchToEdit[column.id]}
                      onChange={(e) => {
                        setMatchToEdit({
                          ...matchToEdit,
                          [column.id]: parseInt(e.target.value.toString()),
                        });
                      }}
                    >
                      {stadiums.map((stadium, index) => (
                        <MenuItem value={stadium.std_id}>{stadium.std_name}</MenuItem>
                      ))}
                    </Select>
                  );
                }

                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{column.name}</Typography>
                    </Grid>

                    <Grid item xs={9}>
                      {value}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                backgroundColor: "#ff5c5c",
                p: 1,
                m: 1,
                fontWeight: 700,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#ff5c5c",
                },
              }}
              onClick={(e) => setShowEditMatch(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                backgroundColor: "#4caf50",
                p: 1,
                m: 1,
                fontWeight: 700,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#4caf50",
                },
              }}
              onClick={() => {
                const match = { ...matchToEdit };

                if (!isMatchFinished) {
                  match.finish = 2 * 10 ** 9;
                }

                match.start = Math.round(match.start);
                match.finish = Math.round(match.finish);

                if (validateMatch(match, clubs, referees) !== "") {
                  toast.error(validateMatch(match, clubs, referees));
                  return;
                }

                (async () => {
                  const response = await updateMatchApi(match);

                  if (response?.status === "success") {
                    toast.success("Match updated successfully");
                  }

                  setShowEditMatch(false);
                  setForceUpdate(Date.now());
                })();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Box
        sx={{
          backgroundColor: "white",
          p: 2,
          boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={clubs.find((club) => club.club_id === match.team1)?.logo_high}
                alt="team1"
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  my: 2,
                }}
              >
                {clubs.find((club) => club.club_id === match.team1)?.club_name}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {/* TODO: fix stadium */}
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "1.5rem",
                // color: "#37003c",
              }}
            >
              Date & Time
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              {dayjs.unix(match.start).format("DD/MM/YYYY")}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              {dayjs.unix(match.start).format("HH:mm")}
            </Typography>

            {match.finish >= Date.now() / 1000 && (
              <Box
                sx={{
                  my: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    color: "#4caf50",
                  }}
                >
                  Live
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  {dayjs
                    .unix(currentDateTime - match.start)
                    .subtract(8, "hour")
                    .format("HH:mm:ss")}
                </Typography>
              </Box>
            )}

            <Box sx={{ my: 2 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1.2rem",
                }}
              >
                Results
              </Typography>
              <ScoreItem match={match} />
            </Box>

            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              >
                Stadium
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {stadiums && stadiums.find((stadium) => stadium.std_id === match.stadium)?.std_name}
              </Typography>
            </Box>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  backgroundColor: "#4caf50",
                  p: 1,
                  m: 1,
                  "&:hover": {
                    color: "#4caf50",
                    backgroundColor: "white",
                  },
                }}
                onClick={() => {
                  setMatchToEdit(match);
                  setShowEditMatch(true);
                }}
              >
                <EditIcon />
              </Button>

              {/* delete */}
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  backgroundColor: "#f44336",
                  p: 1,
                  m: 1,
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#f44336",
                  },
                }}
                onClick={() => {
                  (async () => {
                    const response = await deleteMatchApi(match);

                    if (response?.status === "success") {
                      toast.success("Match deleted successfully");
                    }

                    navigate(ADMIN_ROUTES.MATCH);
                  })();
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={clubs.find((club) => club.club_id === match.team2)?.logo_high}
                alt="team2"
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  my: 2,
                }}
              >
                {clubs.find((club) => club.club_id === match.team2)?.club_name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
