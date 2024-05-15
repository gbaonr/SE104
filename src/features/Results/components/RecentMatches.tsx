import { Box, styled, Typography } from "@mui/material";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { TeamItem } from "components/TableResults/ClubItem";
import { ScoreItem } from "components/TableResults/ScoreItem";
import React from "react";
import { Match } from "types/Match";

export type RecentMatchesProps = {
  matches: Match[];
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

export const RecentMatches = (props: RecentMatchesProps) => {
  return (
    <>
      {props.matches.map((match, index) => (
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
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                match.result === "W" ? "#00db74" : match.result === "D" ? "#c3b3c5" : "#e0005e",
              p: 1.5,
              mx: 0.5,
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              color: "white",
              fontWeight: 700,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {match.result}
          </Box>
        </HtmlTooltip>
      ))}
    </>
  );
};
