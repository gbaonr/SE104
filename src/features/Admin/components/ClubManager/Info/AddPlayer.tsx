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

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CountryDropdown } from "react-country-region-selector";
import { Player } from "../apis/types";
import { useEffect } from "react";

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
  // { id: "nationality", name: "Nationality" },
  // { id: "jerseyNumber", name: "Jersey Number" },
  // { id: "position", name: "Position" },
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
  }, [showAddPlayerPopup, playerToEdit]);

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
                    {column.id === "avatar" ? (
                      <Button startIcon={<CloudUploadIcon />} variant="outlined" component="label">
                        Upload
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    ) : column.id === "position" ? (
                      <Select
                        fullWidth
                        label={column.name}
                        name={column.name}
                        id={column.id}
                        value={playerToEdit?.player_pos}
                      >
                        {optionPositions.map((position) => (
                          <MenuItem value={position.id}>{position.name}</MenuItem>
                        ))}
                      </Select>
                    ) : column.id === "player_nation" ? (
                      <CountryDropdown
                        classes="px-2 py-3 bg-white w-full border-2"
                        onChange={(e) => {}}
                        value={playerToEdit?.player_nation}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        label={column.name}
                        id={column.id}
                        value={playerToEdit?.[column.id]}
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
            >
              {typeToEdit === "edit" ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
