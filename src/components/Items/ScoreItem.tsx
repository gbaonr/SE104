import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { Match } from "features/Admin/components/MatchManager/apis/types";

export type ScoreItemProps = {
  match: Match;
};

export const ScoreItem = ({ match }: ScoreItemProps) => {
  const finished = match.finish < Date.now() / 1000;

  return (
    <Typography
      sx={{
        textAlign: "center",
        // backgroundColor: (finished && "#37003c") || "white",
        backgroundColor: "#37003c",
        borderWidth: "1px",
        // fontWeight: (finished && 700) || 400,
        // color: (finished && "white") || "#37003c",
        fontWeight: 700,
        color: "white",
        borderRadius: "5px",
        fontSize: "0.9rem",
        py: 0.5,
        px: 0.5,
      }}
    >
      {match.goal1} - {match.goal2}
    </Typography>
  );
};
