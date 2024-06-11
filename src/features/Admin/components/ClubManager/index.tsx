import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Container,
  Grid,
  InputBase,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import { ADMIN_ROUTES } from "constants/Paths";
import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getClubsApi } from "./apis/get-clubs";
import { Club } from "./apis/types";
import { BlockComponent } from "components/Items/BlockComponent";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  boxShadow: "0px 0px 2px 0px #7b7b7b",
  width: "50%",
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

export const ClubManager = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    (async () => {
      const response = await getClubsApi();

      if ( response?.status === "success") {
        setClubs(response.data);
        setFilteredClubs(response.data);
      } else {
        toast.error("Failed to fetch clubs");
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setFilteredClubs(clubs);
  }, [clubs]);

  useEffect(() => {
    const fuse = new Fuse(Object.values(clubs), {
      keys: ["club_name", "club_shortname"],
      includeScore: true,
    });

    if (searchTerm) {
      const result = fuse.search(searchTerm);
      const matches = result.map(({ item }) => item);
      setFilteredClubs(matches);
    } else {
      setFilteredClubs(clubs);
    }
  }, [searchTerm, clubs]);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BlockComponent>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputRef={searchRef}
          />
        </Search>
      </BlockComponent>

      <BlockComponent sx={{ my: 2 }}>
        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid item xs={12} md={4} lg={3} key={index} className="flex items-center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "100%",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 3px 0px #7b7b7b",
                      backgroundColor: "#fff",
                      p: 1.5,
                    }}
                  >
                    <Skeleton variant="rectangular" width="30%" height={60} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 1.5,
                        width: "100%",
                      }}
                    >
                      <Skeleton width="60%" />
                      <Skeleton width="40%" />
                    </Box>
                  </Box>
                </Grid>
              ))
            : filteredClubs.map((club, index) => (
                <Grid item xs={12} md={4} lg={3} key={index} className="flex items-center">
                  <Link
                    to={ADMIN_ROUTES.CLUB + "/" + club.club_id}
                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 3px 0px #7b7b7b",
                        backgroundColor: "#fff",
                        p: 1.5,
                        "&:hover": {
                          color: "#fff",
                          cursor: "pointer",
                          background:
                            "linear-gradient(98.5deg, #05f0ff -46.16%, #948bff 42.64%, #bf8afb 70.3%);",
                        },
                      }}
                    >
                      <img src={club.logo_high} alt="" width="30%" />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#37003c",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            mt: 1.5,
                            textAlign: "center",
                          }}
                        >
                          {club.club_name}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#37003c",
                            fontSize: "1rem",
                            fontWeight: 400,
                            textAlign: "center",
                            mt: 0.5,
                          }}
                        >
                          {club.club_shortname}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              ))}
        </Grid>
      </BlockComponent>
    </Container>
  );
};
