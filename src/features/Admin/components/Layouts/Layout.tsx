import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import { default as PolicyIcon } from "@mui/icons-material/Menu";
import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { BlockComponent } from "components/Items/BlockComponent";
import { ADMIN_ROUTES } from "constants/Paths";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const features = [
  {
    name: "Club",
    icon: <GroupsIcon />,
    path: ADMIN_ROUTES.CLUB,
  },
  {
    name: "Match",
    icon: <JoinInnerIcon />,
    path: ADMIN_ROUTES.MATCH,
  },
  {
    name: "Policy",
    icon: <PolicyIcon />,
    path: ADMIN_ROUTES.POLICY,
  },
  {
    name: "Users",
    icon: <GroupsIcon />,
    path: ADMIN_ROUTES.USER_MANAGER,
  },
];

interface Props {
  window?: () => Window;
}

export const LayoutAdmin = (props: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation(); // Hook to get current location

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

            {features.map((feature) => (
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
