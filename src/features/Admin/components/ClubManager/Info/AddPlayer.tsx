import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { Club, Player } from "../apis/types";
import { validateAddPlayers } from "../utils/validate-add-players";
import { toast } from "react-toastify";
import { addPlayerApi } from "../apis/add-players";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

type AddPlayerProps = {
  showAddPlayerPopup: boolean;
  setShowAddPlayerPopup: (value: boolean) => void;
  playerToEdit: Player;
  setPlayerToEdit: (value: Player) => void;
  typeToEdit: string;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const optionPositions = [
  { id: "Goalkeepers", name: "Goalkeepers" },
  { id: "Defenders", name: "Defenders" },
  { id: "Midfielders", name: "Midfielders" },
  { id: "Forwards", name: "Forwards" },
];

const optionInput = [
  { id: "player_name", name: "Full Name" },
  { id: "player_bday", name: "Age" },
  { id: "player_pos", name: "Position" },
  { id: "player_nation", name: "Nation" },
  { id: "js_number", name: "Jersey Number" },
];

export const AddPlayer = ({
  showAddPlayerPopup,
  setShowAddPlayerPopup,
  playerToEdit,
  setPlayerToEdit,
  typeToEdit,
}: AddPlayerProps) => {
  useEffect(() => {
    if (!showAddPlayerPopup) {
      setPlayerToEdit(null);
    }
  }, [showAddPlayerPopup, playerToEdit, setPlayerToEdit]);

  useEffect(() => {
    if (playerToEdit) {
      const dataToEdit = {};

      if (!playerToEdit.player_bday) dataToEdit["player_bday"] = dayjs().unix();
      if (!playerToEdit.player_pos) dataToEdit["player_pos"] = optionPositions[0].id;

      if (Object.keys(dataToEdit).length > 0) {
        setPlayerToEdit({
          ...playerToEdit,
          ...dataToEdit,
        });
      }
    }
  }, [playerToEdit, setPlayerToEdit]);

  return (
    <>
      {showAddPlayerPopup && (
        <Dialog open={showAddPlayerPopup} onClose={(e) => setShowAddPlayerPopup(false)}>
          <DialogTitle>Add Player</DialogTitle>

          <DialogContent>
            <Grid container columns={12} spacing={2} sx={{ mt: 1 }}>
              {optionInput.map((column) => (
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
                    {column.id === "position" ? (
                      <Select
                        fullWidth
                        label={column.name}
                        name={column.name}
                        id={column.id}
                        value={playerToEdit?.player_pos}
                        onChange={(e) => {
                          setPlayerToEdit({
                            ...playerToEdit,
                            player_pos: e.target.value,
                          });
                        }}
                      >
                        {optionPositions.map((position) => (
                          <MenuItem value={position.id}>{position.name}</MenuItem>
                        ))}
                      </Select>
                    ) : column.id === "player_nation" ? (
                      <CountryDropdown
                        classes="px-2 py-3 bg-white w-full border-2"
                        onChange={(e) => {
                          setPlayerToEdit({
                            ...playerToEdit,
                            player_nation: e,
                          });
                        }}
                        value={playerToEdit?.player_nation}
                      />
                    ) : column.id === "player_bday" ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Date"
                            value={dayjs.unix(Number(playerToEdit.player_bday))}
                            onChange={(e) => {
                              setPlayerToEdit({
                                ...playerToEdit,
                                player_bday: e.unix(),
                              });
                            }}
                            views={["day", "month", "year"]}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    ) : column.id === "player_pos" ? (
                      <Select
                        fullWidth
                        label={column.name}
                        name={column.name}
                        id={column.id}
                        value={playerToEdit?.player_pos || optionPositions[0].id} // Ensure it always has a value
                        onChange={(e) => {
                          setPlayerToEdit({
                            ...playerToEdit,
                            player_pos: e.target.value,
                          });
                        }}
                      >
                        {optionPositions.map((position) => (
                          <MenuItem key={position.id} value={position.id}>
                            {position.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <TextField
                        fullWidth
                        label={column.name}
                        id={column.id}
                        value={playerToEdit?.[column.id]}
                        onChange={(e) => {
                          setPlayerToEdit({
                            ...playerToEdit,
                            [column.id]:
                              column.id === "js_number" ? parseInt(e.target.value) : e.target.value,
                          });
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
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
              onClick={(e) => setShowAddPlayerPopup(false)}
            >
              Close
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                backgroundColor: "#4caf50",
                p: 1,
                m: 1,
                "&:hover": {
                  color: "white",
                  backgroundColor: "#4caf50",
                },
              }}
              onClick={(e) => {
                const responseValidate = validateAddPlayers(playerToEdit);

                if (responseValidate) {
                  toast.error(responseValidate);
                  return;
                }

                (async () => {
                  // TODO: wait for baonguyen fix, then uncomment this
                  // const response = await addPlayerApi(playerToEdit);
                  // if (response.status === "success") {
                  //   toast.success("Player added successfully");
                  //   setShowAddPlayerPopup(false);
                  //   return;
                  // }
                  // toast.error("An error occurred while trying to add player");
                  // console.log(response);
                })();
              }}
            >
              {typeToEdit === "edit" ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
