import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPlayersApi } from "../../ClubManager/apis/get-players";
import { Club, Player } from "../../ClubManager/apis/types";
import { addEventMatchApi } from "../apis/add-event";
import { deleteEventApi } from "../apis/delete-event";
import { getEventsMatchApi } from "../apis/get-events";
import { Match, MatchEvent } from "../apis/types";
import { updateEventMatchApi } from "../apis/update-event";
import { validateEventMatch } from "../utils/validator";
import { TimeItem } from "components/Items/TimeItem";

type LoadingGoalMatchProps = {
  match: Match;
  clubs: Club[];
  setForceUpdate: (value: number) => void;
};

const columns = [
  { id: "id", header: "#", width: 1 },
  { id: "team_id", header: "Team", width: 2 },
  { id: "player_id", header: "Player", width: 2 },
  { id: "seconds", header: "Time", width: 1 },
  { id: "events", header: "Type", width: 1 },
  { id: "edit", header: "Edit", width: 1 },
  { id: "delete", header: "Delete", width: 1 },
];

const optionInput = [
  { id: "team", name: "Team" },
  { id: "player", name: "Player" },
  { id: "time", name: "Time" },
  { id: "type", name: "Type" },
];

export const LoadingGoalMatch = ({ match, clubs, setForceUpdate }: LoadingGoalMatchProps) => {
  const [showEditGoal, setShowEditGoal] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<MatchEvent>(null);
  const [typeToEdit, setTypeToEdit] = useState<"add" | "edit">("add");

  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getEventsMatchApi(match);

      if (response?.status === "success" && response.data) {
        setEvents(response.data);
      } else {
        toast.error(response.message);
      }
    })();
  }, [match]);

  useEffect(() => {
    (async () => {
      const team1 = clubs.find((club) => club.club_id === match.team1);
      const team2 = clubs.find((club) => club.club_id === match.team2);

      if (!team1 || !team2) return;

      const playerTeam1 = await getPlayersApi(team1);
      const playerTeam2 = await getPlayersApi(team2);

      if (playerTeam1.status === "success" && playerTeam2.status === "success") {
        setPlayers([...playerTeam1.data, ...playerTeam2.data]);
      } else {
        toast.error(playerTeam1.message);
        toast.error(playerTeam2.message);
      }
    })();
  }, [match, clubs]);

  useEffect(() => {
    const data = {};

    if (eventToEdit?.team_id === undefined) data["team_id"] = match.team1;

    if (eventToEdit?.player_id === undefined && players.length > 0)
      data["player_id"] = players.filter((e) => e.player_club === match.team1)[0].player_id;

    if (eventToEdit?.seconds === undefined) data["seconds"] = 0;
    if (eventToEdit?.events === undefined) data["events"] = "A";

    console.log("update", eventToEdit, data);

    if (Object.keys(data).length > 0) {
      setEventToEdit({
        ...eventToEdit,
        ...data,
      });
    }
  }, [eventToEdit, players]);

  useEffect(() => {
    if (!showEditGoal) {
      setEventToEdit(null);
      setTypeToEdit("add");
    }
  }, [showEditGoal]);

  return (
    <>
      {showEditGoal && eventToEdit && (
        <Dialog open={showEditGoal} onClose={(e) => setShowEditGoal(false)}>
          <DialogTitle>{typeToEdit === "add" ? "Add" : "Edit"} Goal</DialogTitle>
          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => {
                let value = null;

                if (column.id === "team") {
                  const team1 = clubs.find((club) => club.club_id === match.team1);
                  const team2 = clubs.find((club) => club.club_id === match.team2);

                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={eventToEdit?.team_id}
                      onChange={(e) => {
                        setEventToEdit({
                          ...eventToEdit,
                          team_id: parseInt(e.target.value.toString()),
                        });
                      }}
                    >
                      <MenuItem value={team1.club_id}>{team1.club_name}</MenuItem>
                      <MenuItem value={team2.club_id}>{team2.club_name}</MenuItem>
                    </Select>
                  );
                } else if (column.id === "player") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={eventToEdit?.player_id}
                      onChange={(e) => {
                        setEventToEdit({
                          ...eventToEdit,
                          player_id: parseInt(e.target.value.toString()),
                        });
                      }}
                    >
                      {eventToEdit &&
                        eventToEdit.team_id &&
                        players
                          .filter((e) => e.player_club === eventToEdit.team_id)
                          .map((player) => (
                            <MenuItem key={player.player_id} value={player.player_id}>
                              {player.player_name}
                            </MenuItem>
                          ))}
                    </Select>
                  );
                } else if (column.id === "time") {
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
                        <TextField
                          fullWidth
                          label="Minutes"
                          type="number"
                          value={Math.floor(eventToEdit?.seconds / 60)}
                          onChange={(e) => {
                            let minutes = parseInt(e.target.value);
                            let seconds = eventToEdit?.seconds % 60;

                            if (isNaN(minutes)) minutes = 0;
                            if (isNaN(seconds)) seconds = 0;

                            setEventToEdit({
                              ...eventToEdit,
                              seconds: minutes * 60 + (seconds % 60),
                            });
                          }}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Seconds"
                          type="number"
                          value={eventToEdit?.seconds % 60}
                          onChange={(e) => {
                            let minutes = Math.floor(eventToEdit?.seconds / 60);
                            let seconds = parseInt(e.target.value);

                            if (isNaN(minutes)) minutes = 0;
                            if (isNaN(seconds)) seconds = 0;

                            setEventToEdit({
                              ...eventToEdit,
                              seconds: minutes * 60 + (seconds % 60),
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                  );
                } else if (column.id === "type") {
                  value = (
                    <Select
                      fullWidth
                      label={column.name}
                      name={column.name}
                      id={column.id}
                      value={eventToEdit?.events}
                      onChange={(e) => {
                        setEventToEdit({
                          ...eventToEdit,
                          events: e.target.value.toString(),
                        });
                      }}
                    >
                      {/* TODO: fix this when events is customizable */}
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
              onClick={(e) => setShowEditGoal(false)}
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
                const event = {
                  ...eventToEdit,
                  match_id: match.match_id,
                };

                if (validateEventMatch(event, match, players) !== "") {
                  toast.error(validateEventMatch(event, match, players));
                  return;
                }

                if (typeToEdit === "add") {
                  (async () => {
                    const response = await addEventMatchApi(event);

                    if (response?.status === "success") {
                      setForceUpdate(Date.now());
                      toast.success("Event added successfully");
                    } else {
                      toast.error(response.message);
                    }
                  })();
                }

                if (typeToEdit === "edit") {
                  (async () => {
                    const response = await updateEventMatchApi(event);

                    if (response?.status === "success") {
                      setForceUpdate(Date.now());
                      toast.success("Event updated successfully");
                    } else {
                      toast.error(response.message);
                    }
                  })();
                }

                setShowEditGoal(false);
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
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            justifyContent: "space-between",
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

          <Button
            variant="outlined"
            onClick={(e) => {
              setTypeToEdit("add");
              setShowEditGoal(true);
              setEventToEdit(null);
            }}
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
          >
            <AddBoxIcon />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
            }}
            columns={{ xs: columns.reduce((acc, cur) => acc + cur.width, 0) }}
          >
            {columns.map((column, index) => (
              <Grid
                key={index}
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
            {events &&
              events
                .sort((a, b) => (a.seconds < b.seconds ? -1 : 1))
                .map((event, index) => (
                  <>
                    {columns.map((column) => {
                      let value = null;

                      if (column.id === "id") {
                        value = (index + 1).toString();
                      } else if (column.id === "team_id") {
                        value = (
                          <TeamItem
                            leftLogo={true}
                            club={clubs.find((club) => club.club_id === event.team_id)}
                          />
                        );
                      } else if (column.id === "player_id") {
                        value = players.find(
                          (player) => player.player_id === event.player_id,
                        )?.player_name;
                      } else if (column.id === "seconds") {
                        // convert seconds to mm:ss
                        // const minutes = Math.floor(event.seconds / 60);
                        // const seconds = event.seconds - minutes * 60;

                        // value = `${minutes}:${seconds}`;
                        // value = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

                        value = <TimeItem event={event} />;
                      } else if (column.id === "events") {
                        value = event.events;
                      } else if (column.id === "edit") {
                        value = (
                          <Button
                            variant="outlined"
                            sx={{ color: "green" }}
                            onClick={(e) => {
                              setTypeToEdit("edit");
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
                              (async () => {
                                const response = await deleteEventApi(event);

                                if (response?.status === "success") {
                                  setForceUpdate(Date.now());
                                  toast.success("Event deleted successfully");
                                } else {
                                  toast.error(response.message);
                                }
                              })();
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
    </>
  );
};
