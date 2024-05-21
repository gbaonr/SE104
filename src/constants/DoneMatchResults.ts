import { Match } from "types/Match";
import { teamsInfo } from "./Teams";
import { dataPlayers } from "./Players";

export const dataDoneMatches: Match[] = [
  {
    id: 0,
    team: teamsInfo.Arsenal,
    opponent: teamsInfo.Chelsea,
    result: "W",
    score: "2-0",
    location: "Emirates Stadium",
    time: "22:10",
    finished: true,
    date: "05/21/2024",
    events: [
      {
        id: 0,
        player: dataPlayers[0],
        type: "A",
        time: "10:00",
        team: teamsInfo.Arsenal,
      },
      {
        id: 1,
        player: dataPlayers[1],
        type: "B",
        time: "20:00",
        team: teamsInfo.Arsenal,
      },
    ],
  },
  {
    id: 1,
    team: teamsInfo.Arsenal,
    opponent: teamsInfo.Chelsea,
    result: "W",
    score: "2-0",
    location: "Emirates Stadium",
    time: "22:10",
    finished: true,
    date: "05/21/2024",
    events: [
      {
        id: 2,
        player: dataPlayers[2],
        type: "A",
        time: "10:00",
        team: teamsInfo.Arsenal,
      },
      {
        id: 3,
        player: dataPlayers[3],
        type: "B",
        time: "20:00",
        team: teamsInfo.Arsenal,
      },
    ],
  },
  {
    id: 2,
    team: teamsInfo.Arsenal,
    opponent: teamsInfo.Chelsea,
    result: "W",
    score: "2-0",
    location: "Emirates Stadium",
    time: "22:10",
    finished: true,
    date: "05/21/2024",
    events: [
      {
        id: 4,
        player: dataPlayers[4],
        type: "A",
        time: "10:00",
        team: teamsInfo.Arsenal,
      },
      {
        id: 5,
        player: dataPlayers[5],
        type: "B",
        time: "20:00",
        team: teamsInfo.Arsenal,
      },
    ],
  },
  {
    id: 3,
    team: teamsInfo.Arsenal,
    opponent: teamsInfo.Chelsea,
    result: "W",
    score: "2-0",
    location: "Emirates Stadium",
    time: "22:10",
    finished: true,
    date: "05/21/2024",
    events: [
      {
        id: 6,
        player: dataPlayers[6],
        type: "A",
        time: "10:00",
        team: teamsInfo.Arsenal,
      },
      {
        id: 7,
        player: dataPlayers[7],
        type: "B",
        time: "20:00",
        team: teamsInfo.Arsenal,
      },
    ],
  },
];
