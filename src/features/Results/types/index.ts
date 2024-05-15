import { styled, Typography } from "@mui/material";
import { Team, Match } from "types";

export type TeamPerformance = {
  team: Team;
  currentPosition: number;
  prevPosition: number;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  recentMatches: Match[];
  nextMatch: Match;
};

export const TeamItem = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  color: "#37003c",
}));
