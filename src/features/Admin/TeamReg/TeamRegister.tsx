import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import HeaderPage from "components/Layouts/PageHeader";
import { useState } from "react";

export default function RegistrationPage() {
  const [activeSection, setActiveSection] = useState("form");
  const [player, setPlayer] = useState({
    fullName: "",
    age: "",
    nationality: "",
    jerseyNumber: "",
    position: "",
  });
  const [playersList, setPlayersList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDelete = (index) => {
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
            variant="contained"
            onClick={() => handleSectionChange("form")}
            disabled={activeSection === "form"}
          >
            Register Player
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSectionChange("players")}
            disabled={activeSection === "players"}
          >
            View Registered Players
          </Button>
        </Box>
        {activeSection === "form" && (
          <Box sx={{ my: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={player.fullName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    value={player.age}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nationality"
                    name="nationality"
                    value={player.nationality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Jersey Number"
                    name="jerseyNumber"
                    value={player.jerseyNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={player.position}
                    onChange={handleChange}
                  />
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
