export type Club = {
  club_id?: string;
  club_name?: string;
  club_shortname?: string;
  manager?: number;
  logo_low?: string;
  logo_high?: string;
};

export type Player = {
  player_id?: string;
  player_name?: string;
  player_bday?: number;
  player_club?: string;
  player_pos?: string;
  player_nation?: string;
  js_number?: number;
};
