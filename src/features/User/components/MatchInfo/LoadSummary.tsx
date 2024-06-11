import { Box, Divider, Grid, Typography } from "@mui/material";
import { ScoreItem } from "components/Items/ScoreItem";
import { TimeItem } from "components/Items/TimeItem";
import dayjs from "dayjs";
import { getPlayersApi } from "features/Admin/components/ClubManager/apis/get-players";
import { Club, Player } from "features/Admin/components/ClubManager/apis/types";
import { getEventsMatchApi } from "features/Admin/components/MatchManager/apis/get-events";
import { Match, MatchEvent } from "features/Admin/components/MatchManager/apis/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type SummaryMatchProps = {
  match: Match;
  clubs: Club[];
};

type LoadingGoalPerTeamProps = {
  goalsTeam: MatchEvent[];
  playersRender: Player[];
};

type LoadingClubProps = {
  club: Club;
};

const LoadingGoalPerTeam = ({ goalsTeam, playersRender }: LoadingGoalPerTeamProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
      }}
    >
      {goalsTeam.map((goal) => (
        <Box
          key={goal.event_id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.5rem",
            my: 1,
          }}
        >
          <Typography
            sx={{
              // fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#37003c",
            }}
          >
            {playersRender.find((player) => player.player_id === goal.player_id)?.player_name}
          </Typography>

          <TimeItem event={goal} />
        </Box>
      ))}
    </Box>
  );
};

const LoadingClub = ({ club }: LoadingClubProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={club?.logo_high}
        alt={club?.club_name}
        style={{ width: "150px", height: "150px" }}
      />
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#37003c",
          mt: 1,
        }}
      >
        {club?.club_name}
      </Typography>
    </Box>
  );
};

export const SummaryMatch = ({ match, clubs }: SummaryMatchProps) => {
  const [team1, setTeam1] = useState<Club>();
  const [team2, setTeam2] = useState<Club>();

  const [goalsTeam1, setGoalsTeam1] = useState<MatchEvent[]>([]);
  const [goalsTeam2, setGoalsTeam2] = useState<MatchEvent[]>([]);

  const [playersTeam1, setPlayersTeam1] = useState<Player[]>([]);
  const [playersTeam2, setPlayersTeam2] = useState<Player[]>([]);

  const fetchEvents = async () => {
    const response = await getEventsMatchApi(match);

    if (response && response?.status === "success") {
      const data = response.data;

      setGoalsTeam1(data.filter((event) => event.team_id === match.team1));
      setGoalsTeam2(data.filter((event) => event.team_id === match.team2));
    } else {
      toast.error("Failed to load events");
    }
  };

  const fetchPlayers = async () => {
    if (!team1 || !team2) return;

    const responseTeam1 = await getPlayersApi(team1);
    const responseTeam2 = await getPlayersApi(team2);

    if (responseTeam1 && responseTeam1.status === "success") {
      setPlayersTeam1(responseTeam1.data);
    } else {
      toast.error("Failed to load players");
    }

    if (responseTeam2 && responseTeam2.status === "success") {
      setPlayersTeam2(responseTeam2.data);
    } else {
      toast.error("Failed to load players");
    }
  };

  useEffect(() => {
    if (!team1 || !team2 || !match) return;

    fetchEvents();
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team1, team2, match]);

  useEffect(() => {
    setTeam1(clubs.find((club) => club.club_id === match.team1));
    setTeam2(clubs.find((club) => club.club_id === match.team2));
  }, [clubs, match]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            alignContent: "right",
            justifyContent: "flex-end",
          }}
        >
          <LoadingClub club={team1} />
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <ScoreItem
              match={match}
              sx={{
                fontSize: "1.5rem",
                p: 1,
              }}
            />

            {match.start <= Date.now() / 1000 && match.finish === 2 * 10 ** 9 && (
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                Live
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid
          item
          xs={5}
          sx={{ display: "flex", alignContent: "left", justifyContent: "flex-start" }}
        >
          <LoadingClub club={team2} />
        </Grid>
      </Grid>

      <Divider
        sx={{
          my: 2,
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={5}>
          <LoadingGoalPerTeam goalsTeam={goalsTeam1} playersRender={playersTeam1} />
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Divider variant="middle" flexItem orientation="vertical" />
        </Grid>

        <Grid item xs={5}>
          <LoadingGoalPerTeam goalsTeam={goalsTeam2} playersRender={playersTeam2} />
        </Grid>
      </Grid>
    </Box>
  );
};
