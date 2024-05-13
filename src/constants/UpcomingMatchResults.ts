import { MatchesByDate } from "types";
import { Teams } from "./Teams";

export const dataUpcomingMatches: { [tournament: string]: MatchesByDate } = {
  "First Team": {
    "Saturday 11 May 2024": [
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
    ],
    "Tuesday 7 May 2024": [
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
    ],
  },
  PL2: {
    "Sunday 5 May 2024": [
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
    ],
  },
  U18: {
    "Friday 3 May 2024": [
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
    ],
    "Sunday 28 April 2024": [
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: false,
      },
    ],
  },
};
