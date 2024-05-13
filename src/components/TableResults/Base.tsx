import StadiumIcon from "@mui/icons-material/Stadium";
import { Box, Grid, Typography } from "@mui/material";
import type { Match, MatchesByDate, TableResultsProps } from "./constants";
import { TeamItem } from "./constants";

export default function TableMatches(props: TableResultsProps) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          fontSize: "0.8rem",
          margin: "0.5rem",
          textAlign: "center",
        }}
      >
        All times shown are your local time
      </Typography>

      {Object.keys(props.data).map((date: string) => (
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
              {date}
            </Typography>

            {!props.mini && (
              <img
                src="assets/images/main/competition_1.png"
                alt="competition"
                style={{ height: "30px" }}
              />
            )}
          </Box>

          {props.data[date].map((match: Match, index: number) => (
            <Grid
              container
              spacing={0}
              sx={{
                my: 0.2,
                py: 0,
                "&:hover": {
                  background:
                    "linear-gradient(98.5deg, #05f0ff -46.16%, #7367ff 42.64%, #963cff 70.3%);",
                },
              }}
              className="flex items-center"
            >
              <Grid item xs={props.mini ? 5 : 2}>
                <TeamItem>{match.team}</TeamItem>
              </Grid>

              <Grid item xs={props.mini ? 2 : 1}>
                <Typography
                  sx={{
                    textAlign: "center",
                    backgroundColor: (props.finished && "#37003c") || "white",
                    borderWidth: "1px",
                    fontWeight: (props.finished && 700) || 400,
                    color: (props.finished && "white") || "#37003c",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    py: 0.5,
                  }}
                >
                  {props.finished ? match.score : match.time}
                </Typography>
              </Grid>

              <Grid item xs={props.mini ? 5 : 2}>
                <TeamItem>{match.opponent}</TeamItem>
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
}

export type { MatchesByDate };
