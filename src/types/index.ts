export type Match = {
  team: Team;
  opponent: Team;
  result: string; // W, D, L
  score: string;
  location: string;
  time: string;
  finished?: boolean;
};

export type MatchesByDate = {
  [date: string]: Match[];
};

export type TableResultsProps = {
  mini?: boolean;
  data: MatchesByDate;
};

export type Team = {
  name: string;
  logo: string;
};
