import React, { useState, ChangeEvent, FormEvent } from "react";
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
  Typography,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { CountryDropdown, CountryRegionData } from "react-country-region-selector";
import ReactCountryFlag from "react-country-flag";
import HeaderPage from "../../components/Header/PageHeader";
import FilterListIcon from '@mui/icons-material/FilterList'; // Import the funnel icon

const positions = [
  "Defender",
  "WingBack",
  "Central Midfielder",
  "Defensive Midfielder",
  "Attacking Midfielder",
  "Winger",
  "CentreForward",
];

interface Player {
  fullName: string;
  age: number | string;
  nationality: string;
  jerseyNumber: number | string;
  position: string;
  image?: string;
}

export default function RegistrationPage() {
  const [activeSection, setActiveSection] = useState<string>("form");
  const [player, setPlayer] = useState<Player>({
    fullName: "",
    age: "",
    nationality: "",
    jerseyNumber: "",
    position: "",
    image: "",
  });
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [filterValues, setFilterValues] = useState<Partial<Player>>({
    fullName: "",
    age: "",
    nationality: "",
    jerseyNumber: "",
    position: "",
  });

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlayer((prevState) => ({
          ...prevState,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
      image: "",
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

  const getCountryCode = (countryName: string) => {
    const country = CountryRegionData.find(([name]) => name === countryName);
    return country ? country[1] : "";
  };

  const filterPlayers = (player: Player) => {
    return Object.keys(filterValues).every((key) => {
      if (filterValues[key as keyof Player]) {
        return String(player[key as keyof Player]).toLowerCase().includes(String(filterValues[key as keyof Player]).toLowerCase());
      }
      return true;
    });
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFilterValues((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
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
                        value={player.position
                        }
                        onChange={handleSelectChange}
                      >
                        {positions.map((position, index) => (
                          <MenuItem key={index} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Player Image:
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
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
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                <FilterListIcon sx={{ mr: 1 }} /> {/* Filter icon here */}
                Filtering
              </Typography>
              <Grid container alignItems="center" spacing={2}>
                {Object.keys(filterValues).map((key, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                    <TextField
                      fullWidth
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      name={key}
                      value={filterValues[key as keyof Player]}
                      onChange={handleFilterChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }}>Image</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Full Name</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Age</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Nationality</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Jersey Number</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Position</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playersList.filter(filterPlayers).map((player, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: 'center', padding: '8px' }}>
                        {player.image && (
                          <img
                            src={player.image}
                            alt={player.fullName}
                            style={{
                              display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{player.fullName}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{player.age}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <ReactCountryFlag
                          countryCode={getCountryCode(player.nationality)}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1.5em",
                            marginRight: "0.5em",
                          }}
                        />
                        {player.nationality}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{player.jerseyNumber}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{player.position}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(index)}
                        >
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
