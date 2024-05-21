import StadiumIcon from "@mui/icons-material/Stadium";
import { Box, Grid, Typography } from "@mui/material";
import { TeamItem } from "components/Items/ClubItem";
import { ScoreItem } from "components/Items/ScoreItem";
import { Match } from "types/Match";

export type TableResultsProps = {
  mini?: boolean;
  useShortName?: boolean;
  data: Match[];
};

export const TableMatches = (props: TableResultsProps) => {
  const uniqueDates = Array.from(new Set(props.data.map((match) => match.date)));
  const matchesByDate = uniqueDates.map((date) => ({
    date,
    matches: props.data.filter((match) => match.date === date),
  }));

  matchesByDate.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? 1 : -1;
  });

  return (
    <>
      {matchesByDate.map((matchByDate) => (
        <Box
          sx={{
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: props.mini ? "center" : "space-between",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: props.mini ? 700 : 900,
                fontSize: props.mini ? "1rem" : "1.2rem",
                margin: "0.3rem",
              }}
            >
              {matchByDate.date}
            </Typography>

            {!props.mini && (
              <img
                src="/assets/images/main/competition_1.png"
                alt="competition"
                style={{ height: "30px" }}
              />
            )}
          </Box>

          {matchByDate.matches.map((match, index) => (
            <Grid
              container
              spacing={0}
              sx={{
                my: 0.2,
                py: (props.mini && 0) || 1,
                "&:hover": {
                  background:
                    "linear-gradient(98.5deg, #05f0ff -46.16%, #948bff 42.64%, #bf8afb 70.3%);",
                },
              }}
              className="flex items-center"
            >
              <Grid item xs={props.mini ? 5 : 2}>
                <TeamItem useShortName={props.useShortName} team={match.team} />
              </Grid>

              <Grid item xs={props.mini ? 2 : 1}>
                <ScoreItem match={match} />
              </Grid>

              <Grid item xs={props.mini ? 5 : 2}>
                <TeamItem useShortName={props.useShortName} leftLogo={true} team={match.opponent} />
              </Grid>

              {!props.mini && (
                <Grid item xs={2}>
                  {" "}
                </Grid>
              )}

              {!props.mini && (
                <Grid item xs={5} className="flex items-center">
                  <StadiumIcon />

                  <Typography
                    sx={{
                      color: "#37003c",
                      fontSize: "0.8rem",
                      mx: 2,
                    }}
                  >
                    {match.location}
                  </Typography>
                </Grid>
              )}
            </Grid>
          ))}
        </Box>
      ))}
    </>
  );
};
