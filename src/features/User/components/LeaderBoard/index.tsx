import { Container, Grid, Typography } from "@mui/material";
import { TeamItem } from "components/Items/ClubItem";
import { Team } from "types/Team";
import HeaderPage from "../Layouts/PageHeader";
import { NextMatch } from "./NextMatch";
import { RecentMatches } from "./RecentMatches";
import { dataLeaderboardTeams } from "features/User/constants/LeaderboardTeams";
import { useEffect, useState } from "react";
import { getRankingApi } from "./apis/get-ranking";
import { toast } from "react-toastify";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { getClubsApi } from "features/Admin/components/ClubManager/apis/get-clubs";

export type ColumnProps = {
  width?: number;
  header: string;
  field: string;
  leftAlign?: boolean;
};

const columns: ColumnProps[] = [
  { width: 1, header: "#", field: "currentPosition" },
  { width: 5, header: "Club", field: "club_id", leftAlign: true },
  { width: 1, header: "Played", field: "club_played" },
  { width: 1, header: "Won", field: "club_win" },
  { width: 1, header: "Drawn", field: "club_draw" },
  { width: 1, header: "Lost", field: "club_lost" },
  { width: 1, header: "GF", field: "club_goals" },
  { width: 1, header: "GA", field: "away_goals" },
  { width: 1, header: "GD", field: "club_gdif" },
  { width: 1, header: "Points", field: "club_points" },

  // TODO: return ids
  // { width: 4, header: "Form", field: "recentMatches" },
  // { width: 1, header: "Next", field: "nextMatch" },
];

export const LeaderBoard = () => {
  const [rankingResult, setRankingResult] = useState<RankingClub[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);

  const fetchClubs = async () => {
    const response = await getClubsApi();

    if ( response?.status === "success") {
      setClubs(response.data);
    } else {
      toast.error("Failed to load clubs");
    }
  };

  const fetchRankingList = async () => {
    const response = await getRankingApi(false);

    if ( response?.status === "success") {
      setRankingResult(response.data);
    } else {
      toast.error("Failed to load ranking");
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchRankingList();
  }, []);

  return (
    <>
      <HeaderPage headerName="Leaderboard" />

      <Container>
        <Grid
          columns={{ lg: columns.reduce((acc, column) => acc + column.width, 0) }}
          container
          spacing={2}
        >
          {columns.map((column, index) => (
            <Grid
              item
              key={index}
              xs={column.width}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: (column.leftAlign && "flex-start") || "center",
                backgroundColor: "#f0f0f0",
                py: "0.5rem !important",
                px: "0 !important",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "#37003c",
                }}
              >
                {column.header}
              </Typography>
            </Grid>
          ))}

          {rankingResult.map((club, index) =>
            columns.map((column, index) => (
              <Grid
                item
                key={index}
                xs={column.width}
                sx={{
                  textAlign: column.field === "team" ? "left" : "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: (column.leftAlign && "flex-start") || "center",
                  borderBottom: "2px solid #f0f0f0",
                  py: "1rem !important",
                  px: "0 !important",
                }}
              >
                {column.field === "club_id" ? (
                  <TeamItem
                    leftLogo={true}
                    club={clubs.find((c) => c.club_id === club[column.field]) as Team}
                  />
                ) : column.field === "recentMatches" ? (
                  <RecentMatches matches={club[column.field]} />
                ) : column.field === "nextMatch" ? (
                  <NextMatch match={club[column.field]} />
                ) : column.field === "club_points" ? (
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#37003c",
                    }}
                  >
                    {club.club_goals.toString()}
                  </Typography>
                ) : column.field === "currentPosition" ? (
                  <Typography>{index + 1}</Typography>
                ) : (
                  <Typography>
                    {typeof club[column.field] === "number"
                      ? club[column.field].toString()
                      : "--"}
                  </Typography>
                )}
              </Grid>
            )),
          )}
        </Grid>
      </Container>
    </>
  );
};
