export type Params = {
  max_club_player?: number;
  max_foreign_player?: number;
  max_goal_time?: number;
  max_goal_types?: number;
  max_player_age?: number;
  min_club_player?: number;
  min_player_age?: number;
  points_draw?: number;
  points_lose?: number;
  points_win?: number;
  priority?: string;
};

export type GoalType = {
  type_id: number;
  type_name: string;
};
