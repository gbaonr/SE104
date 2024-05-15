import { Match } from "types/Match";
import { Team } from "types/Team";

export type ITeamPerformance = {
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
