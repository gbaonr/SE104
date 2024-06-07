import GroupsIcon from "@mui/icons-material/Groups";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import { default as MenuIcon, default as PolicyIcon } from "@mui/icons-material/Menu";
import { ListItemIcon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PermissionDeniedPage from "components/ProhibitPage";
import { ADMIN_ROUTES } from "constants/Paths";
import { useAuth } from "features/Auth/AuthProvider";
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const drawerWidth = 210;
// const features = ["Dashboard"];

const features = [
  // {
  //   name: "Dashboard",
  //   icon: <Dashboard />,
  //   path: ADMIN_ROUTES.DASHBOARD,
  // },
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { hasAdminAccess } = useAuth();

  if (!hasAdminAccess) {
    return <PermissionDeniedPage />;
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          backgroundColor: "#1976d2",
        }}
      />
      <Divider />
      <List>
        {features.map((feature) => (
          <Link
            to={feature.path}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListItem key={feature.name}>
              <ListItemButton>
                <ListItemIcon>{feature.icon}</ListItemIcon>
                <ListItemText primary={feature.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          display: { lg: "none" }, // hide on lg devices
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 10 }}>
        <Outlet />
        {/* <Footer /> */}
      </Box>

      <ToastContainer />
    </Box>
  );
};
