import { Typography } from "@mui/material";
import { Match } from "types/Match";

export type ScoreItemProps = {
  match: Match;
};

export const ScoreItem = (props: ScoreItemProps) => {
  return (
    <Typography
      sx={{
        textAlign: "center",
        backgroundColor: (props.match.finished && "#37003c") || "white",
        borderWidth: "1px",
        fontWeight: (props.match.finished && 700) || 400,
        color: (props.match.finished && "white") || "#37003c",
        borderRadius: "5px",
        fontSize: "0.9rem",
        py: 0.5,
        px: 0.5,
      }}
    >
      {props.match.finished ? props.match.score : props.match.time}
    </Typography>
  );
};
