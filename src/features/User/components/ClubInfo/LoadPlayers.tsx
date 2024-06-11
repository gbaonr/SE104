import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { getPlayersApi } from "features/Admin/components/ClubManager/apis/get-players";
import { Club, Player } from "features/Admin/components/ClubManager/apis/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import country from "data/country.json";

type LoadPlayersClubPageProps = {
  club: Club;
};

export const LoadPlayersClubPage = ({ club }: LoadPlayersClubPageProps) => {
  const [uniquePositions, setUniquePositions] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    if (!club) return;

    const response = await getPlayersApi({
      club_name: club.club_name,
    });
    
    if (response?.status === "success") {
      setPlayers(response.data);
    }
  };

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!club) return;
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [club]);

  useEffect(() => {
    if (!players || !players.length) return;

    const positions = players.map((player) => player.player_pos);
    const uniquePositions = Array.from(new Set(positions));
    setUniquePositions(uniquePositions);
  }, [players]);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {uniquePositions.map((position) => (
        <Container
          key={position}
          maxWidth={false}
          sx={{
            my: 3,
          }}
        >
          <Typography
            sx={{
              color: "#37003c",
              fontSize: "2rem",
              fontWeight: 700,
            }}
          >
            {position}
          </Typography>

          <Grid container spacing={2}>
            {players &&
              players
                .filter((player) => player.player_pos === position)
                .map((player) => {
                  let c =
                    Object.keys(country)
                      .find((key) => country[key] === player.player_nation)
                      ?.toLowerCase() || "";

                  return (
                    <Grid item xs={3} key={player.player_id}>
                      <Box
                        sx={{
                          border: "2px solid #f0f0f0",
                          borderRadius: "8px",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        <img
                          src={player?.ava_url}
                          alt={player.player_name}
                          style={{ width: "100%", height: "auto" }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://resources.premierleague.com/premierleague/photos/players/110x140/Photo-Missing.png";
                          }}
                        />

                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            color: "#37003c",
                            mt: 1,
                            px: 1,
                          }}
                        >
                          {player.player_name.split(" ")[0]}
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "2rem",
                            color: "#37003c",
                            px: 1,
                          }}
                        >
                          {player.player_name.split(" ").slice(1).join(" ")}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "left", my: 1 }}>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: "#37003c",
                              px: 1,
                            }}
                          >
                            {player.js_number}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#37003c",
                            }}
                          >
                            {player.player_pos}
                          </Typography>
                        </Box>

                        <Divider />

                        <Box
                          sx={{
                            display: "flex",
                            px: 1,
                            my: 2,
                            alignItems: "center",
                          }}
                        >
                          <img src={`https://flagcdn.com/w40/${c}.png`} alt="flag" />

                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#37003c",
                              mx: 2,
                            }}
                          >
                            {player.player_nation}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
          </Grid>
        </Container>
      ))}
    </Container>
  );
};
