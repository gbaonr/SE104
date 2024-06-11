import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getClubsApi } from "../ClubManager/apis/get-clubs";
import { AddMatch } from "./AddMatch";
import { getMatchesApi } from "./apis/get-matches";
import { Match, Stadium } from "./apis/types";
import { LoadingMatches } from "./LoadingMatches";
import { getStadiumsApi } from "./apis/get-stadiums";

type MatchManagerProps = {
  setForceUpdate: (value: number) => void;
  forceUpdate: number;
};

export const MatchManger = ({ setForceUpdate, forceUpdate }: MatchManagerProps) => {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [clubs, setClubs] = useState<any[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const update = () => {
    (async () => {
      const response = await getMatchesApi();

      if (response?.status === "success") {
        setMatches(response.data);
      }
    })();

    (async () => {
      const response = await getClubsApi();

      if (response?.status === "success") {
        setClubs(response.data);
      }
    })();

    // fetchStadiums();
  };

  useEffect(() => {
    update();
  }, [forceUpdate]);

  const upcomingMatches = useMemo(
    () =>
      matches.filter(
        (match) =>
          match.start > Date.now() / 1000 ||
          (match.start < Date.now() / 1000 && match.finish > Date.now() / 1000),
      ),
    [matches],
  );

  const doneMatches = useMemo(
    () => matches.filter((match) => match.finish < Date.now() / 1000),
    [matches],
  );

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
          backgroundColor: "white",
          p: 2,
          boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
          borderRadius: 2,
          mb: 1,
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
        header="Upcoming Matches"
        isDone={false}
      />

      <LoadingMatches isDone={true} data={doneMatches} clubs={clubs} header="Done Matches" />

      <AddMatch
        showAddMatch={showAddMatch}
        setShowAddMatch={setShowAddMatch}
        clubs={clubs}
        setForceUpdate={setForceUpdate}
      />
    </Container>
  );
};
