import { Box, Container } from "@mui/material";
import { dataDoneMatches } from "constants/DoneMatchResults";
import { dataUpcomingMatches } from "constants/UpcomingMatchResults";
import { LoadingMatches } from "./LoadingMatches";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddMatch } from "./AddMatch";
import { useState } from "react";

export const MatchManger = () => {
  const [showAddMatch, setShowAddMatch] = useState(false);

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

      <LoadingMatches data={dataUpcomingMatches} header="Upcoming Matches" />
      <LoadingMatches data={dataDoneMatches} header="Done Matches" />

      <AddMatch showAddMatch={showAddMatch} setShowAddMatch={setShowAddMatch} />
    </Container>
  );
};
