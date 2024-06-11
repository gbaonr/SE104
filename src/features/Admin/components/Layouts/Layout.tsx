import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import LogoutIcon from "@mui/icons-material/Logout";
import { default as PolicyIcon } from "@mui/icons-material/Menu";
import SportsIcon from "@mui/icons-material/Sports";
import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { BlockComponent } from "components/Items/BlockComponent";
import { ADMIN_ROUTES, USER_ROUTES } from "constants/Paths";
import { useAuth } from "features/Auth/AuthProvider";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const features = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "/",
    manager: true,
    admin: true,
  },
  {
    name: "Club",
    icon: <GroupsIcon />,
    path: ADMIN_ROUTES.CLUB,
    manager: true,
    admin: true,
  },
  {
    name: "Match",
    icon: <JoinInnerIcon />,
    path: ADMIN_ROUTES.MATCH,
    manager: false,
    admin: true,
  },
  {
    name: "Policy",
    icon: <PolicyIcon />,
    path: ADMIN_ROUTES.POLICY,
    manager: false,
    admin: true,
  },
  {
    name: "Referees",
    icon: <SportsIcon />,
    path: ADMIN_ROUTES.REFEREE_MANAGER,
    manager: false,
    admin: true,
  },
  {
    name: "Users",
    icon: <GroupsIcon />,
    path: ADMIN_ROUTES.USER_MANAGER,
    manager: false,
    admin: true,
  },
  {
    name: "Sign Out",
    path: USER_ROUTES.SIGN_OUT,
    icon: <LogoutIcon />,
    manager: true,
    admin: true,
  },
];

interface Props {
  window?: () => Window;
}

export const LayoutAdmin = (props: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation(); // Hook to get current location
  const { hasManagerAccess, hasAdminAccess } = useAuth();

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid item xs={2}>
          <BlockComponent sx={{ my: 2, position: "sticky", top: 0, height: "100vh" }}>
            <img
              src="/assets/images/main/pl-main-logo.png"
              alt="logo"
              style={{ width: "30%", margin: "auto", marginTop: 24, marginBottom: 24 }}
            />

            <Divider />

            {features
              .filter((e) => {
                return (hasManagerAccess && e.manager) || hasAdminAccess;
              })
              .map((feature) => (
                <Link
                  key={feature.name}
                  to={feature.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      my: 0.5,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      backgroundColor: feature.path === location.pathname ? "#f2f2f2" : "white", // Use location.pathname
                      fontWeight: feature.path === location.pathname ? "bold" : "normal", // Use location.pathname
                      fontSize: 18,
                      borderRadius: 4,
                      justifyContent: isSmallScreen ? "center" : "flex-start",
                    }}
                  >
                    {feature.icon}
                    {!isSmallScreen && <Box sx={{ ml: 3 }}>{feature.name}</Box>}
                  </Box>
                </Link>
              ))}
          </BlockComponent>
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              m: 2,
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};
