import { styled, Typography } from "@mui/material";

export interface Match {
  team: string;
  opponent: string;
  result: string;
  score: string;
  location: string;
  time: string;
}

export interface MatchesByDate {
  [date: string]: Match[];
}

export interface TableResultsProps {
  mini?: boolean;
  finished?: boolean;
  data: MatchesByDate;
}

const TeamItem = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  color: "#37003c",
}));

export { TeamItem };
