import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import HeaderPage from "../../components/Header/PageHeader";

const positions = [
  "Defender",
  "WingBack",
  "Central Midfielder",
  "Defensive Midfielder",
  "Attacking Midfielder",
  "Winger",
  "CentreForward"
];

interface Player {
  fullName: string;
  age: number | string;
  nationality: string;
  jerseyNumber: number | string;
  position: string;
}

export default function RegistrationPage() {
  const [activeSection, setActiveSection] = useState<string>("form");
  const [player, setPlayer] = useState<Player>({
    fullName: "",
    age: "",
    nationality: "",
    jerseyNumber: "",
    position: "",
  });
  const [playersList, setPlayersList] = useState<Player[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlayersList([...playersList, player]);
    setPlayer({
      fullName: "",
      age: "",
      nationality: "",
      jerseyNumber: "",
      position: "",
    });
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleDelete = (index: number) => {
    const updatedPlayersList = [...playersList];
    updatedPlayersList.splice(index, 1);
    setPlayersList(updatedPlayersList);
  };

  return (
    <>
      <HeaderPage headerName="Player Registration" />
      <Container>
        <Box sx={{ my: 4 }}>
          <Button
            variant={activeSection === "form" ? "contained" : "outlined"}
            onClick={() => handleSectionChange("form")}
          >
            Register Player
          </Button>
          <Button
            variant={activeSection === "players" ? "contained" : "outlined"}
            onClick={() => handleSectionChange("players")}
          >
            View Registered Players
          </Button>
        </Box>
        {activeSection === "form" && (
          <Box sx={{ my: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Full Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        name="fullName"
                        value={player.fullName}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Age:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        name="age"
                        type="number"
                        value={player.age}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Nationality:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <CountryDropdown
                        value={player.nationality}
                        onChange={(value) => setPlayer((prevState) => ({ ...prevState, nationality: value }))}
                        classes="custom-dropdown"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Jersey Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        name="jerseyNumber"
                        type="number"
                        value={player.jerseyNumber}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Position:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Select
                        fullWidth
                        name="position"
                        value={player.position}
                        onChange={handleSelectChange}
                      >
                        {positions.map((position, index) => (
                          <MenuItem key={index} value={position}>{position}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit">
                    Register Player
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
        {activeSection === "players" && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Registered Players
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Nationality</TableCell>
                    <TableCell>Jersey Number</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playersList.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell>{player.fullName}</TableCell>
                      <TableCell>{player.age}</TableCell>
                      <TableCell>{player.nationality}</TableCell>
                      <TableCell>{player.jerseyNumber}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => handleDelete(index)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
    </>
  );
}
