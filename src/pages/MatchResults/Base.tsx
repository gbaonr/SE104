import { Box, Grid, styled, Typography } from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";

interface Match {
  team: string;
  opponent: string;
  result: string;
  score: string;
  location: string;
  time: string;
  finsihed: boolean;
}

interface MatchesByDate {
  [date: string]: Match[];
}

const TeamItem = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  color: "#37003c",
}));

export default function TableMatches(props: MatchesByDate) {
  return (
    <>
      {Object.keys(props).map((date: string) => (
        <Box
          sx={{
            my: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              style={{ fontWeight: 900, fontSize: "1.2rem" }}
            >
              {date}
            </Typography>

            <img
              src="assets/images/main/competition_1.png"
              alt="competition"
              style={{ height: "30px" }}
            />
          </Box>

          {props[date].map((match: Match, index: number) => (
            <Grid
              container
              spacing={0}
              sx={{
                my: 2,
                py: 1,
                "&:hover": {
                  background:
                    "linear-gradient(98.5deg, #05f0ff -46.16%, #7367ff 42.64%, #963cff 70.3%);",
                },
              }}
              className="flex items-center"
            >
              <Grid item xs={2}>
                <TeamItem>{match.team}</TeamItem>
              </Grid>

              <Grid item xs={1}>
                <Typography
                  sx={{
                    textAlign: "center",
                    backgroundColor: "#37003c",
                    fontWeight: 700,
                    color: "white",
                    borderRadius: "5px",
                    py: 1,
                  }}
                >
                  {match.finsihed ? match.score : match.time}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <TeamItem>{match.opponent}</TeamItem>
              </Grid>

              <Grid item xs={2}>
                {" "}
              </Grid>

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
            </Grid>
          ))}
        </Box>
      ))}
    </>
  );
}

export type { MatchesByDate };
