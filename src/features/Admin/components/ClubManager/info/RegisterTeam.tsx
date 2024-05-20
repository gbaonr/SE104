import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { dataPlayers } from "constants/Players";
import { Team } from "types/Team";
import EditIcon from "@mui/icons-material/Edit";

type ListPlayerTeamProps = {
  team: Team;
};

const columns = [
  { id: "id", label: "ID", width: 1, center: true },
  { id: "lastName", label: "Last Name", width: 2, center: true },
  { id: "firstName", label: "First Name", width: 2, center: true },
  { id: "age", label: "Age", width: 1, center: true },
  { id: "nationality", label: "Nationality", width: 2, center: true },
  { id: "jerseyNumber", label: "Jersey Number", width: 2, center: true },
  { id: "position", label: "Position", width: 2, center: true },
  { id: "edit", label: "", width: 2, center: true },
];

export const ListPlayerTeam = ({ team }: ListPlayerTeamProps) => {
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#37003c",
          fontWeight: 700,
          mb: 4,
        }}
      >
        Players
      </Typography>

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

        {dataPlayers.map((player, index) =>
          columns.map((column) => (
            <Grid
              item
              xs={column.width}
              sx={{
                border: "1px solid #f0f0f0",
                display: (column.id === "edit" && "flex") || "block",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                padding: "0.5rem !important",
                // paddingTop: "0.5rem !important",
                // paddingBottom: "0.5rem !important",
              }}
            >
              {column.id === "edit" ? (
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    <EditIcon />
                  </Button>
                </Box>
              ) : (
                <Typography
                  gutterBottom
                  sx={{
                    textAlign: column.center ? "center" : "left",
                    margin: "0",
                  }}
                >
                  {column.id === "id" ? index + 1 : player[column.id]}
                </Typography>
              )}
            </Grid>
          )),
        )}
      </Grid>
    </Box>
  );
};
