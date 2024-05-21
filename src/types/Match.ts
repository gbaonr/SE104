import { EventMatch } from "./Event";
import { Team } from "./Team";

export type Match = {
  id: number;
  team: Team;
  opponent: Team;
  result: string; // W, D, L
  score: string;
  location: string;
  time: string;
  date: string;
  finished?: boolean;
  events?: EventMatch[];
};

export type MatchesByDate = {
  [date: string]: Match[];
};
