import { Team } from "./Team";

export type Player = {
  avatar: string;
  fullName: string;
  age: number;
  nationality: string;
  jerseyNumber: number;
  position: string;
  team: Team;
};
