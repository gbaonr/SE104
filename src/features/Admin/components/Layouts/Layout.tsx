import GroupsIcon from "@mui/icons-material/Groups";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import { default as PolicyIcon } from "@mui/icons-material/Menu";
import { Divider, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { BlockComponent } from "components/Items/BlockComponent";
import { ADMIN_ROUTES } from "constants/Paths";
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
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [isClosing, setIsClosing] = React.useState(false);
  // const { hasAdminAccess, isAuthLoading } = useAuth();

  // if (isAuthLoading) {
  //   return (
  //     <Backdrop open={true}>
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  // if (!hasAdminAccess) {
  //   return <PermissionDeniedPage />;
  // }

  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  // const drawer = (
  //   <div>
  //     <Toolbar
  //       sx={{
  //         backgroundColor: "#1976d2",
  //       }}
  //     />
  //     <Divider />
  //     <List>
  //       {features.map((feature) => (
  //         <Link
  //           to={feature.path}
  //           style={{
  //             textDecoration: "none",
  //             color: "inherit",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <ListItem key={feature.name}>
  //             <ListItemButton>
  //               <ListItemIcon key={feature.name}>{feature.icon}</ListItemIcon>
  //               <ListItemText primary={feature.name} />
  //             </ListItemButton>
  //           </ListItem>
  //         </Link>
  //       ))}
  //     </List>
  //   </div>
  // );

  // return (
  //   <Box sx={{ display: "flex", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
  //     <CssBaseline />

  //     <AppBar
  //       position="fixed"
  //       sx={{
  //         width: { sm: `calc(100% - ${drawerWidth}px)` },
  //         ml: { sm: `${drawerWidth}px` },
  //         boxShadow: "none",
  //         display: { lg: "none" }, // hide on lg devices
  //       }}
  //     >
  //       <Toolbar>
  //         <IconButton
  //           color="inherit"
  //           aria-label="open drawer"
  //           edge="start"
  //           onClick={handleDrawerToggle}
  //           sx={{ mr: 2, display: { sm: "none" } }}
  //         >
  //           <MenuIcon />
  //         </IconButton>
  //       </Toolbar>
  //     </AppBar>

  //     <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
  //       <Drawer
  //         variant="temporary"
  //         open={mobileOpen}
  //         onTransitionEnd={handleDrawerTransitionEnd}
  //         onClose={handleDrawerClose}
  //         ModalProps={{
  //           keepMounted: true, // Better open performance on mobile.
  //         }}
  //         sx={{
  //           display: { xs: "block", sm: "none" },
  //           "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
  //         }}
  //       >
  //         {drawer}
  //       </Drawer>

  //       <Drawer
  //         variant="permanent"
  //         sx={{
  //           display: { xs: "none", sm: "block" },
  //           "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
  //         }}
  //         open
  //       >
  //         {drawer}
  //       </Drawer>
  //     </Box>

  //     <Box component="main" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 10 }}>
  //       <Outlet />
  //       {/* <Footer /> */}
  //     </Box>

  //     <ToastContainer />
  //   </Box>
  // );

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
                to={feature.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box
                  key={feature.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    my: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    backgroundColor:
                      feature.path === window.location.pathname ? "#f2f2f2" : "white",
                    fontWeight: feature.path === window.location.pathname ? "bold" : "normal",
                    fontSize: 18,
                    borderRadius: 4,
                  }}
                >
                  {feature.icon}
                  <Box sx={{ ml: 3 }}>{feature.name}</Box>
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
