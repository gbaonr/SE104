import { styled, Typography } from "@mui/material";

export type Match = {
  team: string;
  opponent: string;
  result: string;
  score: string;
  location: string;
  time: string;
};

export type MatchesByDate = {
  [date: string]: Match[];
};

export type TableResultsProps = {
  mini?: boolean;
  finished?: boolean;
  data: MatchesByDate;
};

export const TeamItem = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  color: "#37003c",
}));
