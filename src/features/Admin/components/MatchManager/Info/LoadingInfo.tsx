import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import StadiumIcon from "@mui/icons-material/Stadium";
import {
  Box,
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
import { TeamItem } from "components/Items/ClubItem";
import { teamsInfo } from "constants/Teams";
import dayjs from "dayjs";
import { useState } from "react";
import { Match } from "types/Match";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

type LoadingInfoMatchProps = {
  match: Match;
};

const optionInput = [
  { id: "team", name: "Team" },
  { id: "opponent", name: "Opponent" },
  { id: "location", name: "Location" },
  { id: "date", name: "Date" },
  { id: "time", name: "Time" },
];

export const LoadingInfoMatch = ({ match }: LoadingInfoMatchProps) => {
  const [showEditMatch, setShowEditMatch] = useState<boolean>(false);

  return (
    <>
      {showEditMatch && (
        <Dialog open={showEditMatch} onClose={(e) => setShowEditMatch(false)}>
          <DialogTitle>Edit Match</DialogTitle>
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
                      value={
                        Object.keys(teamsInfo).find(
                          (team) => teamsInfo[team].name === match[column.id].name,
                        ) || ""
                      }
                    >
                      {Object.keys(teamsInfo).map((team) => (
                        <MenuItem value={team}>{team}</MenuItem>
                      ))}
                    </Select>
                  );
                } else if (column.id === "time") {
                  const date =
                    match.date.replace(/\//g, "-").split("-").reverse().join("-") +
                    "T" +
                    match.time;

                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker", "TimePicker"]}>
                        <TimePicker label="Time" value={dayjs(date)} />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (column.id === "date") {
                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Date"
                          value={dayjs(match.date)}
                          views={["day", "month", "year"]}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (column.id === "location") {
                  value = (
                    <TextField
                      fullWidth
                      label={column.name}
                      id={column.id}
                      value={match.location}
                    />
                  );
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
              onClick={(e) => setShowEditMatch(false)}
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
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#37003c",
              mb: 2,
            }}
          >
            <TeamItem team={match.team} />
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#37003c",
              mb: 2,
              mx: 2,
            }}
          >
            vs
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#37003c",
              mb: 2,
            }}
          >
            <TeamItem leftLogo={true} team={match.opponent} />
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <StadiumIcon />

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1.2rem",
              // color: "#37003c",
              mb: 2,
            }}
          >
            {match.location}
          </Typography>

          <EventIcon />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              // color: "#37003c",
            }}
          >
            {match.date}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              // color: "#37003c",
            }}
          >
            {match.time}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* edit */}
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
              alert("delete");
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
};
