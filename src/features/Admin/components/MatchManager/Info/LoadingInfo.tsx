import { Box, Typography } from "@mui/material";
import { TeamItem } from "components/Items/ClubItem";
import { Match } from "types/Match";
import StadiumIcon from '@mui/icons-material/Stadium';
import EventIcon from '@mui/icons-material/Event';

type LoadingInfoMatchProps = {
  match: Match;
};

export const LoadingInfoMatch = ({ match }: LoadingInfoMatchProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        my: 2,
      }}
    >
      {/* <Typography
        sx={{
          fontWeight: 700,
          fontSize: "1.7rem",
          color: "#37003c",
          mb: 4,
        }}
      >
        Info
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#37003c",
            mb: 2,
          }}
        >
          <TeamItem team={match.team} />
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#37003c",
            mb: 2,
            mx: 2,
          }}
        >
          vs
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#37003c",
            mb: 2,
          }}
        >
          <TeamItem leftLogo={true} team={match.opponent} />
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <StadiumIcon />

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1.2rem",
            // color: "#37003c",
            mb: 2,
          }}
        >
          {match.location}
        </Typography>

        <EventIcon />
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1rem",
            // color: "#37003c",
          }}
        >
          {match.date}
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1rem",
            // color: "#37003c",
          }}
        >
          {match.time}
        </Typography>
      </Box>
    </Box>
  );
};
