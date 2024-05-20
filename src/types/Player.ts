import { Team } from "./Team";

export type Player = {
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  jerseyNumber: number;
  position: string;
  team: Team;
};
