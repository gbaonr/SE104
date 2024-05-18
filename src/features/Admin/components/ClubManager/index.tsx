import SearchIcon from "@mui/icons-material/Search";
import { alpha, Box, Container, Grid, InputBase, styled, Typography } from "@mui/material";
import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import { Team } from "types/Team";

export type ClubManagerProps = {
  data: {
    [team: string]: Team;
  };
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  boxShadow: "0px 0px 5px 0px #000000",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const ClubManager = (props: ClubManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const [filteredTeams, setFilteredTeams] = useState(Object.values(props.data));

  useEffect(() => {
    const fuse = new Fuse(Object.values(props.data), {
      keys: ["name", "shortName"],
      includeScore: true,
    });

    if (searchTerm) {
      const result = fuse.search(searchTerm);
      const matches = result.map(({ item }) => item);
      setFilteredTeams(matches);
    } else {
      setFilteredTeams(Object.values(props.data));
    }
  }, [searchTerm, props.data]);

  return (
    <Container maxWidth="lg">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          // onKeyUp={(e) => handleSearch(e)}
          onChange={(e) => setSearchTerm(e.target.value)}
          inputRef={searchRef}
        />
      </Search>

      <Grid
        container
        spacing={3}
        sx={{
          my: 2,
        }}
      >
        {filteredTeams.map((team, index) => (
          <Grid item xs={12} md={4} lg={3} key={index} className="flex items-center">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 0px 5px 0px #000000",
                p: 1.5,
                "&:hover": {
                  color: "#fff",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                  background:
                    "linear-gradient(98.5deg, #05f0ff -46.16%, #7367ff 42.64%, #963cff 70.3%);",
                },
              }}
            >
              <img src={team.logo_high} alt="" width="30%" />

              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Typography
                  sx={{
                    color: "#37003c",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    mt: 1.5,
                  }}
                >
                  {team.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#37003c",
                    fontSize: "1rem",
                    fontWeight: 400,
                    mt: 0.5,
                  }}
                >
                  {team.shortName}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
