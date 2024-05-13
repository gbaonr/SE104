import { TeamPerformance } from "../types";
import { Teams } from "constants/Teams";

export const dataLeaderboardTeams: { [tournament: string]: TeamPerformance[] } = {
  "First Team": [
    {
      currentPosition: 1,
      team: Teams.Arsenal,
      prevPosition: 1,
      matchesPlayed: 10,
      wins: 8,
      draws: 2,
      losses: 0,
      goalsFor: 20,
      goalsAgainst: 5,
      goalDifference: 15,
      points: 26,
      recentMatches: [],
      nextMatch: {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
      },
    },
    {
      currentPosition: 2,
      team: Teams.Chelsea,
      prevPosition: 2,
      matchesPlayed: 10,
      wins: 7,
      draws: 2,
      losses: 1,
      goalsFor: 15,
      goalsAgainst: 5,
      goalDifference: 10,
      points: 23,
      recentMatches: [],
      nextMatch: {
        team: Teams.Chelsea,
        opponent: Teams.Arsenal,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
      },
    },
  ],
};
