import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { TeamItem } from "components/Items/ClubItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { dataPlayers } from "constants/Players";
import { useState } from "react";
import { Match } from "types/Match";

type LoadingGoalMatchProps = {
  match: Match;
};

const columns = [
  { id: "id", header: "#", width: 1 },
  { id: "team", header: "Team", width: 2 },
  { id: "player", header: "Player", width: 2 },
  { id: "time", header: "Time", width: 1 },
  { id: "type", header: "Type", width: 1 },
  { id: "edit", header: "Edit", width: 1 },
  { id: "delete", header: "Delete", width: 1 },
];

const optionInput = [
  { id: "team", name: "Team" },
  { id: "player", name: "Player" },
  { id: "time", name: "Time" },
  { id: "type", name: "Type" },
];

export const LoadingGoalMatch = ({ match }: LoadingGoalMatchProps) => {
  const [showEditGoal, setShowEditGoal] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  return (
    <>
      {showEditGoal && (
        <Dialog open={showEditGoal} onClose={(e) => setShowEditGoal(false)}>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "team") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={eventToEdit.team.name}
                    >
                      <MenuItem value={match.team.name}>{match.team.name}</MenuItem>
                      <MenuItem value={match.opponent.name}>{match.opponent.name}</MenuItem>
                    </Select>
                  );
                } else if (column.id === "player") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={eventToEdit.player.fullName}
                    >
                      {dataPlayers
                        .filter((player) => player.team.name === match.team.name)
                        .map((player) => (
                          <MenuItem value={player.fullName}>{player.fullName}</MenuItem>
                        ))}
                    </Select>
                  );
                } else if (column.id === "time") {
                  value = (
                    <TextField
                      fullWidth
                      label={column.name}
                      id={column.id}
                      defaultValue={eventToEdit.time}
                    />
                  );
                } else if (column.id === "type") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={eventToEdit.type}
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  );
                }

                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={3}>
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
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.7rem",
            color: "#37003c",
            mb: 4,
          }}
        >
          Goal
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
            columns={{ xs: columns.reduce((acc, cur) => acc + cur.width, 0) }}
          >
            {columns.map((column) => (
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

            {/* loading data */}
            {match.events.map((event, index) => (
              <>
                {columns.map((column) => {
                  let value = null;

                  if (column.id === "id") {
                    value = (index + 1).toString();
                  } else if (column.id === "team") {
                    value = <TeamItem leftLogo={true} team={event.team} />;
                  } else if (column.id === "player") {
                    value = event.player.fullName;
                  } else if (column.id === "time") {
                    value = event.time;
                  } else if (column.id === "type") {
                    value = event.type;
                  } else if (column.id === "edit") {
                    value = (
                      <Button
                        variant="outlined"
                        sx={{ color: "green" }}
                        onClick={(e) => {
                          setShowEditGoal(true);
                          setEventToEdit(event);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    );
                  } else if (column.id === "delete") {
                    value = (
                      <Button
                        variant="outlined"
                        sx={{ color: "red" }}
                        onClick={(e) => {
                          alert("Delete");
                        }}
                      >
                        <DeleteIcon />
                      </Button>
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
                      }}
                    >
                      {value}
                    </Grid>
                  );
                })}
              </>
            ))}
          </Grid>
        </Box>
      </Box>
      );
    </>
  );
};
