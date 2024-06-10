import { Box, Typography } from "@mui/material";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { Link } from "react-router-dom";

export type TeamItemProps = {
  club: Club;
  leftLogo?: boolean | false;
  align?: "center" | "left" | "right";
  useShortName?: boolean;
  hideName?: boolean;
};

export const TeamItem = (props: TeamItemProps) => {
  return (
    <>
      {props.club && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {props.leftLogo && (
            <img src={props.club.logo_low} alt={props.club.club_name} style={{ height: "30px" }} />
          )}

          {!props.hideName && (
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 500,
                mx: 1,
                color: "#37003c",
              }}
            >
              {(props.useShortName && props.club.club_shortname) || props.club.club_name}
            </Typography>
          )}

          {!props.leftLogo && (
            <img src={props.club.logo_low} alt={props.club.club_name} style={{ height: "30px" }} />
          )}
        </Box>
      )}
    </>
  );
};
