import { Box, Typography } from "@mui/material";
import { Team } from "types/Team";

export type TeamItemProps = {
  team: Team;
  leftLogo?: boolean | false;
  align?: "center" | "left" | "right";
  useShortName?: boolean;
  hideName?: boolean;
};

export const TeamItem = (props: TeamItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.leftLogo && (
        <img src={props.team.logo} alt={props.team.name} style={{ height: "30px" }} />
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
          {(props.useShortName && props.team.shortName) || props.team.name}
        </Typography>
      )}

      {!props.leftLogo && (
        <img src={props.team.logo} alt={props.team.name} style={{ height: "30px" }} />
      )}
    </Box>
  );
};
