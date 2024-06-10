import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { MatchEvent } from "features/Admin/components/MatchManager/apis/types";

type TimeItemProps = {
  event: MatchEvent;
};

export const TimeItem = ({ event }: TimeItemProps) => {
  const time = event?.seconds || 0;

  return (
    <Typography
      sx={{
        color: "#37003c",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
    >
      {dayjs.unix(time).subtract(8, "hour").format("m")}'
    </Typography>
  );
};
