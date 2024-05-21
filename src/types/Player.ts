import { Team } from "./Team";

export type Player = {
  // TODO: it player should have an unique id
  id?: number;
  avatar: string;
  fullName: string;
  age: number;
  nationality: string;
  jerseyNumber: number;
  position: string;
  team: Team;
};
