export type Match = {
  match_id?: number;
  team1?: number; // club_id
  team2?: number; // club_id
  ref_id?: number; // user_id
  var_id?: number; // user_id
  lineman_id?: number; // user_id
  goal1?: number;
  goal2?: number;
  start?: number;
  finish?: number;
};

export type MatchEvent = {
  player_id?: number;
  match_id?: number;
  seconds?: number;
  events?: string;
  event_id?: number;
  team_id?: number;
};
