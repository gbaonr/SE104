export type Match = {
  match_id?: number;
  team1?: number; // club_id
  team2?: number; // club_id
  ref?: number; // user_id
  var?: number; // user_id
  lineman?: number; // user_id
  goal1?: number;
  goal2?: number;
  start?: number;
  finish?: number;
  stadium?: number; // std_id
};

export type MatchEvent = {
  player_id?: number;
  match_id?: number;
  seconds?: number;
  events?: string;
  event_id?: number;
  team_id?: number;
};

export type Referee = {
  ref_id?: number;
  ref_name?: string;
  ref_nation?: string;
  ref_mail?: string;
  ref_bday?: number;
};

export type Stadium = {
  std_name?: string;
  std_id?: number;
  std_cap: number;
};
