import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import HeaderPage from "../../components/Header/PageHeader";

export default function RegistrationPage() {
  const [player, setPlayer] = useState({
    fullName: "",
    age: "",
    nationality: "",
    jerseyNumber: "",
    position: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the player data, such as submitting it to an API or storing it in state.
    console.log(player);
    // Reset the form after submission
    setPlayer({
      fullName: "",
      age: "",
      nationality: "",
      jerseyNumber: "",
      position: "",
    });
  };

  return (
    <>
      <HeaderPage headerName="Player Registration" />

      <Container>
        <Box sx={{ my: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={player.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={player.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={player.nationality}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
      </Container>
    </>
  );
}