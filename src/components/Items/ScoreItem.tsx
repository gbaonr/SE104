import { SxProps, Theme, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Match } from "features/Admin/components/MatchManager/apis/types";

export type ScoreItemProps = {
  match: Match;
  sx?: SxProps<Theme>; // Accepts additional sx prop
};

export const ScoreItem = ({ match, sx }: ScoreItemProps) => {
  const finished = match.finish < Date.now() / 1000;
  const running = match.start < Date.now() / 1000 && match.finish > Date.now() / 1000;

  return (
    <Typography
      sx={{
        textAlign: "center",
        backgroundColor: (finished && "#37003c") || (running && "#5fa548") || "white",
        borderWidth: "1px",
        fontWeight: ((finished || running) && 700) || 400,
        color: ((finished || running) && "white") || "#37003c",
        borderRadius: "5px",
        fontSize: "0.9rem",
        py: 0.5,
        px: 0.5,
        ...sx,
      }}
    >
      {finished || running
        ? `${match.goal1} - ${match.goal2}`
        : dayjs.unix(match.start).format("HH:mm")}
    </Typography>
  );
};
