export type Club = {
  club_id?: number;
  club_name?: string;
  club_shortname?: string;
  manager?: number;
  logo_low?: string;
  logo_high?: string;
};

export type Player = {
  player_id?: number;
  player_name?: string;
  player_bday?: number;
  player_club?: number;
  player_pos?: string;
  player_nation?: string;
  js_number?: number;
  avatar_url?: string;
};
