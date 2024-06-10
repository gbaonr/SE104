import { Container, Grid, Typography } from "@mui/material";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { getMatchesApi } from "features/Admin/components/MatchManager/apis/get-matches";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TableMatches } from "../TableResults/TableMatches";
import { getClubsApi } from "features/Admin/components/ClubManager/apis/get-clubs";
import { TeamItem } from "components/Items/ClubItem";
import { ScoreItem } from "components/Items/ScoreItem";
import { Link } from "react-router-dom";
import { USER_ROUTES } from "constants/Paths";

type LoadResultsClubPageProps = {
  club: Club;
};

export const LoadResultsClubPage = ({ club }: LoadResultsClubPageProps) => {
  const [matches, setMatches] = useState<Match[]>();
  const [clubs, setClubs] = useState<Club[]>();

  const fetchMatches = async () => {
    if (!club) return;

    const response = await getMatchesApi(club);

    if (response?.status === "success") {
      setMatches(response.data);
    } else {
      toast.error("Failed to load matches");
    }
  };

  const fetchClubs = async () => {
    const response = await getClubsApi();

    if (response?.status === "success") {
      setClubs(response.data);
    } else {
      toast.error("Failed to load clubs");
    }
  };

  useEffect(() => {
    fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [club]);

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 3,
      }}
    >
      {/* <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 500,
          color: "#37003c",
          my: 2,
        }}
      >
        Recent Matches
      </Typography> */}

      {matches &&
        matches.slice(0, 5).map((match, index) => (
          <Link to={`${USER_ROUTES.MATCH_INFO}/${match.match_id}`} key={`match-${index}`}>
            <Grid
              container
              spacing={2}
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                my: 0.5,
                py: 1,
                "&:hover": {
                  background:
                    "linear-gradient(98.5deg, #05f0ff -46.16%, #948bff 42.64%, #bf8afb 70.3%);",
                },
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  py: "0 !important",
                }}
              >
                <TeamItem
                  key={match.match_id}
                  club={clubs?.find((club) => club.club_id === match.team1)}
                />
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  py: "0 !important",
                }}
              >
                <ScoreItem match={match} />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  py: "0 !important",
                }}
              >
                <TeamItem
                  key={match.match_id}
                  club={clubs?.find((club) => club.club_id === match.team2)}
                  leftLogo={true}
                />
              </Grid>
            </Grid>
          </Link>
        ))}
    </Container>
  );
};
