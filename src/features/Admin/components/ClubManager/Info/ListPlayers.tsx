import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deletePlayerApi } from "../apis/delete-players";
import { getPlayersApi } from "../apis/get-players";
import { Club, Player } from "../apis/types";
import { AddPlayer } from "./ManagePlayer";

type ListPlayerTeamProps = {
  club: Club;
};

const columns = [
  { id: "player_id", label: "#", width: 1, center: true },
  { id: "player_name", label: "Full Name", width: 2, center: true },
  { id: "player_nation", label: "Nationality", width: 2, center: true },
  { id: "js_number", label: "Jersey Number", width: 2, center: true },
  { id: "player_pos", label: "Position", width: 2, center: true },
  { id: "edit", label: "", width: 1, center: true },
  { id: "delete", label: "", width: 1, center: true },
];

export const ListPlayerTeam = ({ club }: ListPlayerTeamProps) => {
  const [showAddPlayerPopup, setShowAddPlayerPopup] = useState<boolean>(false);
  const [typeToEdit, setTypeToEdit] = useState("add");

  const [players, setPlayers] = useState<Player[]>([]);
  const [playerToEdit, setPlayerToEdit] = useState(null);

  useEffect(() => {
    if (!club) return;

    (async () => {
      const response = await getPlayersApi({
        club_name: club.club_name,
      });

      if (response?.status === "success") {
        setPlayers(response.data);
      } else {
        toast.error("An error occurred while trying to get players");
      }
    })();
  }, [club]);

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
          variant="h4"
          gutterBottom
          sx={{
            color: "#37003c",
            fontWeight: 900,
            mb: 5,
          }}
        >
          Players
        </Typography>

        <Button
          variant="outlined"
          onClick={(e) => {
            setPlayerToEdit({
              player_club: club.club_id,
            });
            setShowAddPlayerPopup(true);
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

      <Grid
        container
        spacing={2}
        columns={{ lg: columns.reduce((acc, column) => acc + column.width, 0) }}
      >
        {columns.map((column) => (
          <Grid
            item
            xs={column.width}
            sx={{
              border: "1px solid #f0f0f0",
              p: "0.5rem !important",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                textAlign: "center",
                m: 0,
              }}
              gutterBottom
            >
              {column.label}
            </Typography>
          </Grid>
        ))}

        {players.map((player, index) =>
          columns.map((column) => (
            <Grid
              item
              xs={column.width}
              sx={{
                border: "1px solid #f0f0f0",
                display: ((column.id === "edit" || column.id === "delete") && "flex") || "block",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                padding: "0.5rem !important",
              }}
            >
              {column.id === "edit" || column.id === "delete" ? (
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: column.id === "edit" ? "gray" : "red",
                      color: "white",
                    }}
                    onClick={(e) => {
                      if (column.id === "edit") {
                        setTypeToEdit("edit");
                        setPlayerToEdit(player);
                        setShowAddPlayerPopup(true);
                      } else if (column.id === "delete") {
                        (async () => {
                          const response = await deletePlayerApi(player);

                          if (response?.status === "success") {
                            setPlayers(players.filter((p) => p.player_id !== player.player_id));
                            toast.success("Player deleted successfully");
                          } else {
                            toast.error("An error occurred while trying to delete player");
                          }
                        })();
                      }
                    }}
                  >
                    {column.id === "edit" && <EditIcon />}
                    {column.id === "delete" && <DeleteIcon />}
                  </Button>
                </Box>
              ) : column.id === "avatar" ? (
                <img
                  style={{
                    textAlign: column.center ? "center" : "left",
                    margin: "0 auto",
                    cursor: "pointer",
                  }}
                  src={player[column.id]}
                  alt=""
                  height="36px"
                  width="36px"
                />
              ) : (
                <Typography
                  gutterBottom
                  sx={{
                    textAlign: column.center ? "center" : "left",
                    margin: "0",
                  }}
                >
                  {column.id === "player_id" ? index + 1 : player[column.id]}
                </Typography>
              )}
            </Grid>
          )),
        )}
      </Grid>

      <AddPlayer
        showAddPlayerPopup={showAddPlayerPopup}
        setShowAddPlayerPopup={setShowAddPlayerPopup}
        typeToEdit={typeToEdit}
        playerToEdit={playerToEdit}
        setPlayerToEdit={setPlayerToEdit}
      />
    </Box>
  );
};
