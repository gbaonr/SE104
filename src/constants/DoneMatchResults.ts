import { MatchesByDate } from "types";
import { Teams } from "./Teams";

export const dataDoneMatches: { [tournament: string]: MatchesByDate } = {
  "First Team": {
    "Saturday 11 May 2024": [
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: true,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: true,
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
        finished: true,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: true,
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
        finished: true,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: true,
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
        finished: true,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: true,
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
        finished: true,
      },
      {
        team: Teams.Arsenal,
        opponent: Teams.Chelsea,
        result: "W",
        score: "2-0",
        location: "Emirates Stadium",
        time: "22:10",
        finished: true,
      },
    ],
  },
};
