import { Box, styled, Typography } from "@mui/material";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { TeamItem } from "components/Items/ClubItem";
import { ScoreItem } from "components/Items/ScoreItem";
import React from "react";
import { Match } from "types/Match";

export type NextMatchProps = {
  match: Match;
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export const NextMatch = ({ match }: NextMatchProps) => {
  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography variant="body1" sx={{ textAlign: "center", fontSize: "0.8rem", my: 1 }}>
              {match.date}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                gap: "0.5rem",
              }}
            >
              <TeamItem team={match.team} />
              <ScoreItem match={match} />
              <TeamItem leftLogo={true} team={match.opponent} />
            </Box>
          </React.Fragment>
        }
      >
        <Box
          sx={{
            cursor: "pointer",
          }}
        >
          <TeamItem hideName={true} leftLogo={true} team={match.opponent} />
        </Box>
      </HtmlTooltip>
    </>
  );
};
