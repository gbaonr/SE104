import { Box, Typography } from "@mui/material";
import { Club } from "../apis/types";

type HeaderClubInfoProps = {
  club: Club;
};

export const HeaderClubInfo = ({ club }: HeaderClubInfoProps) => {
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
        <img src={club.logo_high} alt=""></img>
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
            {club.club_name}
          </Typography>

          {/* TODO: add stadium */}
          {/* <Typography
            sx={{
              fontSize: "1.5rem",
            }}
          >
            {team.stadium}
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};
