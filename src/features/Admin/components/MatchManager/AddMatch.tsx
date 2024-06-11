import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Club } from "../ClubManager/apis/types";
import { addMatchApi } from "./apis/add-match";
import { getRefereesApi } from "./apis/get-referees";
import { Referee } from "./apis/types";
import { validateMatch } from "./utils/validator";

const optionInput = [
  { id: "team1", name: "Home" },
  { id: "team2", name: "Away" },

  { id: "ref", name: "Referee" },
  { id: "var", name: "VAR" },
  { id: "lineman", name: "Lineman" },

  { id: "start", name: "Start" },
  { id: "check_finish", name: "Finished?" },
  { id: "finish", name: "Finish" },
];

type AddMatchProps = {
  showAddMatch: boolean;
  setShowAddMatch: (value: boolean) => void;
  clubs: Club[];
  setForceUpdate: (value: number) => void;
};

export const AddMatch = ({
  showAddMatch,
  setShowAddMatch,
  clubs,
  setForceUpdate,
}: AddMatchProps) => {
  const [matchToAdd, setMatchToAdd] = useState(null);
  const [referees, setReferees] = useState<Referee[]>([]);
  const [isMatchFinished, setIsMatchFinished] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getRefereesApi();

      if ( response?.status === "success") {
        setReferees(response.data);
      } 
    })();
  }, []);

  useEffect(() => {
    if (!showAddMatch) {
      setMatchToAdd(null);
    }
  }, [showAddMatch]);

  useEffect(() => {
    if (!matchToAdd && clubs.length && referees.length) {
      setMatchToAdd({
        team1: clubs[0].club_id,
        team2: clubs[1].club_id,
        ref: referees[0].ref_id,
        var: referees[1].ref_id,
        lineman: referees[2].ref_id,
        start: Date.now() / 1000,
        finish: Date.now() / 1000,
      });
    }
  }, [matchToAdd, clubs, referees]);

  return (
    <>
      {showAddMatch && matchToAdd && (
        <Dialog open={showAddMatch} onClose={(e) => setShowAddMatch(false)}>
          <DialogTitle>Add Match</DialogTitle>

          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "team1" || column.id === "team2") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={matchToAdd[column.id]}
                    >
                      {clubs.map((club) => (
                        <MenuItem key={club.club_id} value={club.club_id}>
                          {club.club_name}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                } else if (column.id === "check_finish") {
                  value = (
                    <Switch
                      checked={isMatchFinished}
                      onChange={(e) => setIsMatchFinished(e.target.checked)}
                    />
                  );
                } else if (column.id === "start" || (column.id === "finish" && isMatchFinished)) {
                  value = (
                    <Grid
                      container
                      columns={12}
                      spacing={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Date"
                              value={dayjs.unix(matchToAdd.start)}
                              views={["day", "month", "year"]}
                              onChange={(newValue) => {
                                console.log(newValue);

                                setMatchToAdd({
                                  ...matchToAdd,
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
                              value={dayjs.unix(matchToAdd.finish)}
                              onChange={(newValue) => {
                                setMatchToAdd({
                                  ...matchToAdd,
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
                      value={matchToAdd[column.id]}
                    >
                      {referees.map((referee) => (
                        <MenuItem key={referee.ref_id} value={referee.ref_id}>
                          {referee.ref_name}
                        </MenuItem>
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
                      xs={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {((column.id === "finish" && isMatchFinished) || column.id !== "finish") && (
                        <Typography>{column.name}</Typography>
                      )}
                    </Grid>

                    <Grid item xs={10}>
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
              onClick={(e) => setShowAddMatch(false)}
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
              onClick={(e) => {
                // if not finished, set finish to to very far in the future
                let match = { ...matchToAdd };

                if (!isMatchFinished) {
                  const future = new Date();
                  future.setFullYear(future.getFullYear() + 100);

                  match = {
                    ...match,
                    finish: Math.round(future.getTime() / 1000),
                  };
                }

                // convert start and finish to integer
                match.start = Math.round(match.start);
                match.finish = Math.round(match.finish);

                if (validateMatch(match, clubs, referees) !== "") {
                  toast.error(validateMatch(match, clubs, referees));
                  return;
                }

                (async () => {
                  const response = await addMatchApi(match);

                  if ( response?.status === "success") {
                    toast.success("Match added successfully");
                  }

                  setShowAddMatch(false);
                  setForceUpdate(new Date().getTime() / 1000);
                })();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
