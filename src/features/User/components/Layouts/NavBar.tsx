import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { useAuth } from "features/Auth/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

const leftFeatures = [
  {
    name: "Results",
    link: "/results",
  },
  {
    name: "Fixtures",
    link: "/fixtures",
  },
  {
    name: "Tables",
    link: "/tables",
  },
];

const rightFeatures = [
  {
    name: "Sign In",
    link: "/sign-in",
  },
];

function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState<null | HTMLElement>(null);
  const { token } = useAuth();

  const handleOpenMenuIcon = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpenMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setIsOpenMenu(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#37003c" }}>
      <Container maxWidth="xl">
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

          <Box sx={{ flexGrow: 0 }}>
            {!token &&
              rightFeatures.map((page) => (
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
              ))}

            {token && (
              <Button
                key="Sign Out"
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
                <Link to="/sign-out" style={{ textDecoration: "none", color: "black" }}>
                  Sign Out
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
