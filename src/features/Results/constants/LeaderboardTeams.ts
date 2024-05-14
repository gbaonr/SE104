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
      recentMatches: [
        {
          team: Teams.Arsenal,
          opponent: Teams.Chelsea,
          result: "W",
          score: "2-0",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Arsenal,
          opponent: Teams.Chelsea,
          result: "D",
          score: "0-0",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Arsenal,
          opponent: Teams.Chelsea,
          result: "L",
          score: "0-2",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Arsenal,
          opponent: Teams.Chelsea,
          result: "W",
          score: "3-0",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Arsenal,
          opponent: Teams.Chelsea,
          result: "W",
          score: "3-0",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
      ],
      nextMatch: {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        date: "2021-10-10",
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
      recentMatches: [
        {
          team: Teams.Chelsea,
          opponent: Teams.Arsenal,
          result: "L",
          score: "0-2",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Chelsea,
          opponent: Teams.Arsenal,
          result: "D",
          score: "0-0",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Chelsea,
          opponent: Teams.Arsenal,
          result: "W",
          score: "2-0",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Chelsea,
          opponent: Teams.Arsenal,
          result: "L",
          score: "0-3",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
        {
          team: Teams.Chelsea,
          opponent: Teams.Arsenal,
          result: "L",
          score: "0-3",
          location: "Emirates Stadium",
          time: "22:10",
          finished: true,
          date: "2021-10-10",
        },
      ],
      nextMatch: {
        team: Teams.Chelsea,
        opponent: Teams.Arsenal,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        date: "2021-10-10",
      },
    },
  ],
};