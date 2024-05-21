import { Team } from "./Team";

export type Match = {
  id?: string;
  team: Team;
  opponent: Team;
  result: string; // W, D, L
  score: string;
  location: string;
  time: string;
  date: string;
  finished?: boolean;
  minAge?: number;
  maxAge?: number;
  minPlayers?: number;
  maxPlayers?: number;
};

export type MatchesByDate = {
  [date: string]: Match[];
};
