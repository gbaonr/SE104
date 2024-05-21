import { Player } from "./Player";
import { Team } from "./Team";

export type EventMatch = {
  id: number;
  player: Player;
  team: Team;
  type: string; // A, B, C
  time: string;
};
