import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
} from "@mui/material";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { useAuth } from "features/Auth/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const leftFeatures = [
  {
    name: "Results",
    link: "/results",
    needAdmin: false,
  },
  {
    name: "Fixtures",
    link: "/fixtures",
    needAdmin: false,
  },
  {
    name: "Tables",
    link: "/tables",
    needAdmin: false,
  },
];

const rightFeatures = [
  {
    name: "Admin",
    link: "/admin",
    needAdmin: true,
    needLogin: true,
  },
  {
    name: "Sign In",
    link: "/sign-in",
    hideLogin: true,
  },
  {
    name: "Sign Out",
    link: "/sign-out",
    needLogin: true,
  },
];

type NavBarProps = {
  clubs: Club[];
};

const ClubImage = ({ club }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ mx: 1, width: 40, height: 40, position: "relative" }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={40}
          height={40}
          sx={{ bgcolor: "grey.300", position: "absolute", top: 0, left: 0 }}
        />
      )}
      <img
        src={club.logo_low}
        alt={club.club_name}
        style={{
          width: "40px",
          height: "40px",
          display: loaded ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
};

const NavBar = ({ clubs }: NavBarProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState<null | HTMLElement>(null);
  const { token, hasAdminAccess } = useAuth();

  const handleOpenMenuIcon = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpenMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setIsOpenMenu(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth={false}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 1 }}>
          {clubs.map((club) => (
            <ClubImage key={club.club_id} club={club} />
          ))}
        </Box>
      </Container>
      <Container maxWidth={false} sx={{ backgroundColor: "#37003c" }}>
        <Toolbar sx={{ minHeight: "48px !important", padding: 1 }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mx: 2,
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src="assets/images/main/pl-main-logo.png"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenuIcon}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={isOpenMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(isOpenMenu)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {leftFeatures.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={`${page.link}`} style={{ textDecoration: "none" }}>
                    {page.name}
                  </Link>
                </MenuItem>
              ))}

              {token ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/sign-out" style={{ textDecoration: "none" }}>
                    Sign Out
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/sign-in" style={{ textDecoration: "none" }}>
                    Sign In
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img
              src="assets/images/main/pl-main-logo.png"
              alt="logo"
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {leftFeatures.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 0,
                  mx: 1,
                  color: "white",
                  display: "block",
                  fontWeight: 700,
                }}
              >
                <Link to={`${page.link}`} style={{ textDecoration: "none", color: "white" }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {rightFeatures.map((page) => {
              if (page.needLogin && !token) {
                return <></>;
              }

              if (page.needAdmin && !token && !hasAdminAccess) {
                return <></>;
              }

              if (page.hideLogin && token) {
                return <></>;
              }

              return (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 0,
                    mx: 1,
                    color: "black",
                    display: "block",
                    fontWeight: 700,
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                >
                  <Link to={`${page.link}`} style={{ textDecoration: "none", color: "black" }}>
                    {page.name}
                  </Link>
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
