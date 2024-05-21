import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
} from "@mui/material";
import HeaderPage from "features/User/components/Layouts/PageHeader";
import { teamsInfo } from "constants/Teams";

interface Match {
  matchweek: string;
  team1: string;
  team2: string;
  dateTime: string;
  stadium: string;
  referee: string;
  assistantReferee1: string;
  assistantReferee2: string;
  team1LogoUrl?: string;
  team2LogoUrl?: string;
  team1ShortName?: string;
  team2ShortName?: string;
}

interface TeamInfo {
  clubName: string;
  clubShortName: string;
  stadiumName: string;
  logoUrl: string;
}

export default function MatchRegistrationPage() {
  const [match, setMatch] = useState<Match>({
    matchweek: "",
    team1: "",
    team2: "",
    dateTime: "",
    stadium: "",
    referee: "",
    assistantReferee1: "",
    assistantReferee2: "",
  });
  const [matchesList, setMatchesList] = useState<Match[]>([]);
  const [teamsInfo, setTeamsInfo] = useState<TeamInfo[]>([]);

  useEffect(() => {
    const teamsInfoArray = Object.values(teamsInfo).map((team: any) => ({
      clubName: team.name,
      clubShortName: team.shortName,
      stadiumName: "Stadium",
      logoUrl: team.logo_high,
    }));
    setTeamsInfo(teamsInfoArray);
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = event.target;
    setMatch((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));

    if (name === "team1") {
      const matchingTeam1 = teamsInfo.find(
        (team: TeamInfo) => team.clubName.toLowerCase() === (value as string).toLowerCase(),
      );
      if (matchingTeam1) {
        setMatch((prevState) => ({
          ...prevState,
          team1LogoUrl: matchingTeam1.logoUrl,
          team1ShortName: matchingTeam1.clubShortName,
          stadium: matchingTeam1.stadiumName,
        }));
      }
    }

    if (name === "team2") {
      const matchingTeam2 = teamsInfo.find(
        (team: TeamInfo) => team.clubName.toLowerCase() === (value as string).toLowerCase(),
      );
      if (matchingTeam2) {
        setMatch((prevState) => ({
          ...prevState,
          team2LogoUrl: matchingTeam2.logoUrl,
          team2ShortName: matchingTeam2.clubShortName,
        }));
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMatchesList([...matchesList, match]);
    setMatch({
      matchweek: "",
      team1: "",
      team2: "",
      dateTime: "",
      stadium: "",
      referee: "",
      assistantReferee1: "",
      assistantReferee2: "",
      team1LogoUrl: undefined,
      team2LogoUrl: undefined,
      team1ShortName: undefined,
      team2ShortName: undefined,
    });
  };

  const handleDelete = (index: number) => {
    const updatedMatchesList = [...matchesList];
    updatedMatchesList.splice(index, 1);
    setMatchesList(updatedMatchesList);
  };

  return (
    <>
      <HeaderPage headerName="Match Registration" />
      <Container>
        <Box sx={{ my: 4 }}>
          <Box sx={{ my: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Typography variant="subtitle1" gutterBottom>
                        Matchweek
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        name="matchweek"
                        type="number"
                        value={match.matchweek}
                        onChange={handleChange}
                        inputProps={{
                          min: 1,
                          max: 38,
                          style: { textAlign: "center", width: "50px", borderBottom: "none" },
                        }}
                        sx={{ marginLeft: 1 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          fullWidth
                          name="team1"
                          value={match.team1}
                          onChange={handleChange}
                          placeholder="Team 1"
                          sx={{ borderBottom: "none" }}
                        />
                        {match.team1LogoUrl && (
                          <img
                            src={match.team1LogoUrl}
                            alt="Team 1 Logo"
                            style={{ height: "50px", marginLeft: "10px" }}
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={1} sx={{ textAlign: "center" }}>
                      <Typography variant="subtitle1" sx={{ fontSize: "5rem" }}>
                        -
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {match.team2LogoUrl && (
                          <img
                            src={match.team2LogoUrl}
                            alt="Team 2 Logo"
                            style={{ height: "50px", marginRight: "10px" }}
                          />
                        )}
                        <TextField
                          fullWidth
                          name="team2"
                          value={match.team2}
                          onChange={handleChange}
                          placeholder="Team 2"
                          sx={{ borderBottom: "none" }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ width: "fit-content" }}>
                    <TextField
                      name="dateTime"
                      type="datetime-local"
                      value={match.dateTime}
                      onChange={handleChange}
                      placeholder="Date & Time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        width: "fit-content",
                        minWidth: "150px",
                        marginBottom: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ width: "fit-content" }}>
                    <TextField
                      name="stadium"
                      value={match.stadium}
                      onChange={handleChange}
                      placeholder="Stadium"
                      sx={{
                        width: "fit-content",
                        minWidth: "200px",
                        marginBottom: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: "50%" }}>
                        <TextField
                          fullWidth
                          name="referee"
                          value={match.referee}
                          onChange={handleChange}
                          placeholder="Referee"
                          multiline
                          rows={1}
                          sx={{ marginBottom: 2 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: "50%" }}>
                        <TextField
                          fullWidth
                          name="assistantReferee1"
                          value={match.assistantReferee1}
                          onChange={handleChange}
                          placeholder="Assistant Referee 1"
                          multiline
                          rows={1}
                          sx={{ marginBottom: 2 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: "50%" }}>
                        <TextField
                          fullWidth
                          name="assistantReferee2"
                          value={match.assistantReferee2}
                          onChange={handleChange}
                          placeholder="Assistant Referee 2"
                          multiline
                          rows={1}
                          sx={{ marginBottom: 2 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" type="submit">
                    Register Match
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ my: 4 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Matchweek
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Teams
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Stadium
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Referee
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Assistant Referee 1
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      Assistant Referee 2
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matchesList.map((match, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" sx={{ textAlign: "center" }}>
                        {match.matchweek}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          {match.team1LogoUrl && (
                            <img
                              src={match.team1LogoUrl}
                              alt="Team 1 Logo"
                              style={{ height: "30px", marginRight: "5px" }}
                            />
                          )}
                          {match.team1ShortName}
                          <Typography variant="subtitle1" sx={{ mx: 1 }}>
                            -
                          </Typography>
                          {match.team2ShortName}
                          {match.team2LogoUrl && (
                            <img
                              src={match.team2LogoUrl}
                              alt="Team 2 Logo"
                              style={{ height: "30px", marginLeft: "5px" }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {new Date(match.dateTime).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {new Date(match.dateTime).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{match.stadium}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{match.referee}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{match.assistantReferee1}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{match.assistantReferee2}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button onClick={() => handleDelete(index)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
}
