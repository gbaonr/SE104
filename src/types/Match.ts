import { Team } from "./Team";

export type Match = {
  team: Team;
  opponent: Team;
  result: string; // W, D, L
  score: string;
  location: string;
  time: string;
  date: string;
  finished?: boolean;
};

export type MatchesByDate = {
  [date: string]: Match[];
};
