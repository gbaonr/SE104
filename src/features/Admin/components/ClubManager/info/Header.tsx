import { Box, Typography } from "@mui/material";
import { Team } from "types/Team";

type HeaderClubInfoProps = {
  team: Team;
};

export const HeaderClubInfo = ({ team }: HeaderClubInfoProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 4,
        boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
        borderRadius: 2,
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={team.logo_high} alt=""></img>
        <Box
          sx={{
            mx: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "3rem",
              color: "#37003c",
              fontWeight: 900,
            }}
          >
            {team.name}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.5rem",
            }}
          >
            {team.stadium}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
