import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { teamsInfo } from "constants/Teams";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const optionInput = [
  { id: "team", name: "Team" },
  { id: "opponent", name: "Opponent" },
  { id: "location", name: "Location" },
  { id: "date", name: "Date" },
  { id: "time", name: "Time" },
  { id: "referee", name: "Referee" },
  { id: "assistantReferee", name: "Assistant Referee" },
  { id: "assistantReferee2", name: "Assistant Referee 2" },
];

type AddMatchProps = {
  showAddMatch: boolean;
  setShowAddMatch: (value: boolean) => void;
};

export const AddMatch = ({ showAddMatch, setShowAddMatch }: AddMatchProps) => {
  return (
    <>
      {showAddMatch && (
        <Dialog open={showAddMatch} onClose={(e) => setShowAddMatch(false)}>
          <DialogTitle>Add Match</DialogTitle>
          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "team" || column.id === "opponent") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={Object.keys(teamsInfo)[0]}
                    >
                      {Object.keys(teamsInfo).map((team) => (
                        <MenuItem value={team}>{team}</MenuItem>
                      ))}
                    </Select>
                  );
                } else if (column.id === "time") {
                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker", "TimePicker"]}>
                        <TimePicker label="Time" value={dayjs(new Date())} />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (column.id === "date") {
                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Date"
                          value={dayjs(new Date())}
                          views={["day", "month", "year"]}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (
                  column.id === "location" ||
                  column.id === "referee" ||
                  column.id === "assistantReferee" ||
                  column.id === "assistantReferee2"
                ) {
                  value = <TextField fullWidth label={column.name} id={column.id} />;
                }

                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      // alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{column.name}</Typography>
                    </Grid>

                    <Grid item xs={8}>
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
              onClick={(e) => setShowAddMatch(false)}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
