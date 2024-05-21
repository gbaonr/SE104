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

type AddPlayerProps = {
  showAddPlayerPopup;
  setShowAddPlayerPopup;
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
  { id: "forward", name: "Forward" },
  { id: "wingback", name: "WingBack" },
  { id: "central_midfielder", name: "Central Midfielder" },
  { id: "defensive_midfielder", name: "Defensive Midfielder" },
  { id: "attacking_midfielder", name: "Attacking Midfielder" },
  { id: "winger", name: "Winger" },
  { id: "centre_forward", name: "CentreForward" },
];

const optionInput = [
  { id: "avatar", name: "Avatar" },
  { id: "fullName", name: "Full Name" },
  { id: "age", name: "Age" },
  { id: "nationality", name: "Nationality" },
  { id: "jersey_number", name: "Jersey Number" },
  { id: "position", name: "Position" },
];

export const AddPlayer = ({ showAddPlayerPopup, setShowAddPlayerPopup }: AddPlayerProps) => {
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
                        value={optionPositions[0].id}
                      >
                        {optionPositions.map((position) => (
                          <MenuItem value={position.id}>{position.name}</MenuItem>
                        ))}
                      </Select>
                    ) : column.id === "nationality" ? (
                      <CountryDropdown classes="px-2 py-3 bg-white w-full border-2" onChange={(e) => {}} value={""} />
                    ) : (
                      <TextField fullWidth label={column.name} id={column.id} />
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
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
