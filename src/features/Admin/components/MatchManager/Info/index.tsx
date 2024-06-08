import { Container } from "@mui/material";
import { LoadingGoalMatch } from "./LoadingGoal";
import { LoadingInfoMatch } from "./LoadingInfo";
import LoadingPlayerMatch from "./LoadPlayer";
import { Match } from "../apis/types";
import { Club } from "../../ClubManager/apis/types";

type MatchDetailInfoProps = {
  match: Match;
  clubs: Club[];
};

export const MatchDetailInfo = ({ match, clubs }: MatchDetailInfoProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingInfoMatch clubs={clubs} match={match} />

      {/* {match.finished && <LoadingGoalMatch match={match} />} */}
      {/* {match.finish < Date.now() / 1000 && <LoadingGoalMatch match={match} />} */}

      {/* <LoadingPlayerMatch match={match} /> */}
    </Container>
  );
};
