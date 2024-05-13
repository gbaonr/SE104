import StadiumIcon from "@mui/icons-material/Stadium";
import { Box, Grid, Typography } from "@mui/material";
import { Match, TableResultsProps, Team } from "types";

export type TeamItemProps = {
  team: Team;
  leftLogo?: boolean | false;
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

      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 500,
          mx: 1,
          color: "#37003c",
        }}
      >
        {props.team.name}
      </Typography>

      {!props.leftLogo && (
        <img src={props.team.logo} alt={props.team.name} style={{ height: "30px" }} />
      )}
    </Box>
  );
};

export const TableMatches = (props: TableResultsProps) => {
  return (
    <>
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
                py: (props.mini && 0) || 1,
                "&:hover": {
                  background:
                    "linear-gradient(98.5deg, #05f0ff -46.16%, #7367ff 42.64%, #963cff 70.3%);",
                },
              }}
              className="flex items-center"
            >
              <Grid item xs={props.mini ? 5 : 2}>
                <TeamItem team={match.team} />
              </Grid>

              <Grid item xs={props.mini ? 2 : 1}>
                <Typography
                  sx={{
                    textAlign: "center",
                    backgroundColor: (match.finished && "#37003c") || "white",
                    borderWidth: "1px",
                    fontWeight: (match.finished && 700) || 400,
                    color: (match.finished && "white") || "#37003c",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    py: 0.5,
                  }}
                >
                  {match.finished ? match.score : match.time}
                </Typography>
              </Grid>

              <Grid item xs={props.mini ? 5 : 2}>
                <TeamItem leftLogo={true} team={match.opponent} />
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
