import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "features/Auth/Login";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";

import { grey } from "@mui/material/colors";
import { FixturesPage } from "./features/User/routes/Fixtures";
import { HomePage } from "./features/User/routes/HomePage";
import { LeaderBoard } from "features/User/components/LeaderBoard";
import { ResultsPage } from "./features/User/routes/Results";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import { LayoutAdmin } from "features/Admin/components/Layouts/Layout";
import { ClubManagerRoute } from "features/Admin/routes/ClubManager";
import { HomePageAdminRoute } from "features/Admin/routes/HomePage";
import { LayoutUser } from "features/User/components/Layouts/Layout";

import NotFoundPage from "components/NotFound";
import { ADMIN_ROUTES, USER_ROUTES } from "constants/Paths";
import { TeamDetailInfo } from "features/Admin/components/ClubManager/Info";
import { MatchDetailInfo } from "features/Admin/components/MatchManager/Info";
import { getClubsApi } from "features/Admin/components/ClubManager/apis/get-clubs";
import { Club } from "features/Admin/components/ClubManager/apis/types";
import { getMatchesApi } from "features/Admin/components/MatchManager/apis/get-matches";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import PolicyAdj from "features/Admin/components/PolicyAdj";
import { UserManagement } from "features/Admin/components/Users";
import { MatchManagerRoute } from "features/Admin/routes/MatchManager";
import { AuthenticatedComponent, AuthProvider } from "features/Auth/AuthProvider";
import SignOut from "features/Auth/SignOut";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { MatchInfoUserPage } from "features/User/components/MatchInfo";
import { ClubInfoPage } from "features/User/components/ClubInfo";
import { Box, CircularProgress } from "@mui/material";
import { ListClubUserPage } from "features/User/components/ClubInfo/ListClubs";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Roboto",
    },
  },
  palette: {
    grey: grey,
  },
});

const App = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [forceUpdate, setForceUpdate] = useState<number>(Date.now());
  const [loading, setLoading] = useState<boolean>(true);

  const updateInfo = async () => {
    try {
      const clubsResponse = await getClubsApi();
      if (clubsResponse?.status === "success") {
        setClubs(clubsResponse.data);
      } else {
        toast.error("Failed to load clubs");
      }

      const matchesResponse = await getMatchesApi();
      console.log(matchesResponse);

      if (matchesResponse?.status === "success") {
        setMatches(matchesResponse.data);
      } else {
        toast.error("Failed to load matches");
      }

      setLoading(false);
    } catch (error) {
      toast.error("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    updateInfo();
  }, [forceUpdate]);

  const memoizedValue = useMemo(() => ({ clubs, matches }), [clubs, matches]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress disableShrink />;
      </Box>
    );
  }

  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      path: "/",
      element: <LayoutUser clubs={clubs} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: USER_ROUTES.RESULTS, element: <ResultsPage /> },
        { path: USER_ROUTES.FIXTURES, element: <FixturesPage /> },
        { path: USER_ROUTES.TABLES, element: <LeaderBoard /> },
        { path: USER_ROUTES.SIGN_IN, element: <Login /> },
        { path: USER_ROUTES.SIGN_OUT, element: <SignOut /> },

        ...memoizedValue.matches.map((match) => ({
          path: `${USER_ROUTES.MATCH_INFO}/${match.match_id}`,
          element: <MatchInfoUserPage match={match} />,
        })),

        ...memoizedValue.clubs.map((club) => ({
          path: `${USER_ROUTES.CLUB_INFO}/${club.club_id}`,
          element: <ClubInfoPage club={club} />,
        })),

        { path: USER_ROUTES.CLUB_LIST, element: <ListClubUserPage /> },
      ],
    },
    {
      path: ADMIN_ROUTES.DASHBOARD,
      element: (
        <AuthenticatedComponent>
          <LayoutAdmin />
        </AuthenticatedComponent>
      ),
      children: [
        { index: true, element: <HomePageAdminRoute /> },
        {
          path: ADMIN_ROUTES.MATCH,
          element: <MatchManagerRoute forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />,
        },
        { path: ADMIN_ROUTES.CLUB, element: <ClubManagerRoute /> },

        ...memoizedValue.clubs.map((club) => ({
          path: `${ADMIN_ROUTES.CLUB}/${club.club_id}`,
          element: <TeamDetailInfo club={club} />,
        })),

        ...memoizedValue.matches.map((match) => ({
          path: `${ADMIN_ROUTES.MATCH}/${match.match_id}`,
          element: <MatchDetailInfo setForceUpdate={setForceUpdate} clubs={clubs} match={match} />,
        })),

        { path: ADMIN_ROUTES.POLICY, element: <PolicyAdj /> },
        { path: ADMIN_ROUTES.USER_MANAGER, element: <UserManagement /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
