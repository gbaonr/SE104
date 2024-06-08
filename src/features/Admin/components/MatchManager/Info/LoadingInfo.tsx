// TODO: fix  teams and date is not center align

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
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
  Typography,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TeamItem } from "components/Items/ClubItem";
import dayjs from "dayjs";
import { useState } from "react";
import { Club } from "../../ClubManager/apis/types";
import { Match } from "../apis/types";

type LoadingInfoMatchProps = {
  match: Match;
  clubs: Club[];
};

const optionInput = [
  { id: "team1", name: "Team" },
  { id: "team2", name: "Opponent" },
  // { id: "location", name: "Location" },
  { id: "date", name: "Date" },
  { id: "time", name: "Time" },
];

export const LoadingInfoMatch = ({ match, clubs }: LoadingInfoMatchProps) => {
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

                if (column.id === "team1" || column.id === "team2") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={
                        // Object.keys(teamsInfo).find(
                        //   (team) => teamsInfo[team].name === match[column.id].name,
                        // ) || ""
                        clubs.find((club) => club.club_id === match[column.id])?.club_id
                      }
                    >
                      {/* {Object.keys(teamsInfo).map((team) => (
                        <MenuItem value={team}>{team}</MenuItem>
                      ))} */}
                      {clubs.map((club) => (
                        <MenuItem value={club.club_id}>{club.club_name}</MenuItem>
                      ))}
                    </Select>
                  );
                } else if (column.id === "time") {
                  const date = dayjs.unix(match[column.id]);

                  // remove date part
                  date.set("year", 0);
                  date.set("month", 0);
                  date.set("date", 0);

                  console.log(date);

                  // TODO: fix time picker
                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker", "TimePicker"]}>
                        <TimePicker label="Time" value={date} />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (column.id === "date") {
                  const date = dayjs.unix(match.start);

                  date.set("hour", 0);
                  date.set("minute", 0);
                  date.set("second", 0);
                  date.set("millisecond", 0);

                  value = (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker label="Date" value={date} views={["day", "month", "year"]} />
                      </DemoContainer>
                    </LocalizationProvider>
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
            <TeamItem club={clubs.find((club) => club.club_id === match.team1)} />
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
            <TeamItem leftLogo={true} club={clubs.find((club) => club.club_id === match.team2)} />
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
          {/* TODO: fix stadium */}
          {/* <StadiumIcon /> */}
          {/* <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1.2rem",
              // color: "#37003c",
              mb: 2,
            }}
          >
            {match.location}
          </Typography> */}

          <EventIcon />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              // color: "#37003c",
            }}
          >
            {dayjs.unix(match.start).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              // color: "#37003c",
            }}
          >
            {dayjs.unix(match.start).format("HH:mm")}
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
