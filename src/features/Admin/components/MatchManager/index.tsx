import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { AddMatch } from "./AddMatch";
import { getMatchesApi } from "./apis/get-matches";
import { Match } from "./apis/types";
import { LoadingMatches } from "./LoadingMatches";
import { toast } from "react-toastify";
import { getClubsApi } from "../ClubManager/apis/get-clubs";

export const MatchManger = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [clubs, setClubs] = useState<any[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [doneMatches, setDoneMatches] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getMatchesApi();

      if (response.status === "success") {
        setMatches(response.data);
      } else {
        toast.error(response.message);
      }
    })();

    (async () => {
      const response = await getClubsApi();

      if (response.status === "success") {
        setClubs(response.data);
      } else {
        toast.error(response.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (matches.length > 0) {
      console.log(matches);
      console.log(Date.now() / 1000);

      const upcoming = matches.filter((match) => match.start > Date.now() / 1000);
      const done = matches.filter((match) => match.finish < Date.now() / 1000);

      console.log(upcoming, done);

      setUpcomingMatches(upcoming);
      setDoneMatches(done);
    }
  }, [matches]);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            background: "white",
            color: "green",
          }}
          onClick={() => setShowAddMatch(true)}
        >
          <AddIcon />
          Add
        </Button>
      </Box>

      <LoadingMatches
        data={upcomingMatches}
        clubs={clubs}
        showFinished={false}
        header="Upcoming Matches"
      />
      <LoadingMatches data={doneMatches} clubs={clubs} showFinished={true} header="Done Matches" />

      <AddMatch showAddMatch={showAddMatch} setShowAddMatch={setShowAddMatch} />
    </Container>
  );
};
