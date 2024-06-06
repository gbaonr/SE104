import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "features/Auth/Login";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";

import { grey } from "@mui/material/colors";
import { FixturesPage } from "./features/User/routes/Fixtures";
import { HomePage } from "./features/User/routes/HomePage";
import { LeaderBoard } from "./features/User/routes/LeaderBoard";
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
import { dataDoneMatches } from "constants/DoneMatchResults";
import { ADMIN_ROUTES, USER_ROUTES } from "constants/Paths";
import { teamsInfo } from "constants/Teams";
import { dataUpcomingMatches } from "constants/UpcomingMatchResults";
import { TeamDetailInfo } from "features/Admin/components/ClubManager/Info";
import { MatchDetailInfo } from "features/Admin/components/MatchManager/Info";
import MatchRegistrationPage from "features/Admin/components/MatchReg/MatchReg";
import { MatchManagerRoute } from "features/Admin/routes/MatchManager";
import AuthProvider from "features/Auth/AuthProvider";
import SignOut from "features/Auth/SignOut";
import PolicyAdj from "features/Admin/components/PolicyAdj";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      { index: true, element: <HomePage /> },
      { path: USER_ROUTES.RESULTS, element: <ResultsPage /> },
      { path: USER_ROUTES.FIXTURES, element: <FixturesPage /> },
      { path: USER_ROUTES.TABLES, element: <LeaderBoard /> },
      { path: USER_ROUTES.SIGN_IN, element: <Login /> },
      { path: USER_ROUTES.SIGN_OUT, element: <SignOut /> },
    ],
  },
  {
    path: ADMIN_ROUTES.DASHBOARD,
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <HomePageAdminRoute /> },
      { path: ADMIN_ROUTES.MATCH, element: <MatchManagerRoute /> },
      { path: ADMIN_ROUTES.CLUB, element: <ClubManagerRoute /> },
      // loading team info
      ...Object.keys(teamsInfo).map((team) => ({
        path: `${ADMIN_ROUTES.CLUB}/${teamsInfo[team].shortName}`,
        element: <TeamDetailInfo team={teamsInfo[team]} />,
      })),

      // loading match info
      ...dataDoneMatches.map((match) => ({
        path: `${ADMIN_ROUTES.MATCH}/${match.id}`,
        element: <MatchDetailInfo match={match} />,
      })),
      ...dataUpcomingMatches.map((match) => ({
        path: `${ADMIN_ROUTES.MATCH}/${match.id}`,
        element: <MatchDetailInfo match={match} />,
      })),

      { path: ADMIN_ROUTES.MATCH_REGISTRATION, element: <MatchRegistrationPage /> },
      { path: ADMIN_ROUTES.POLICY, element: <PolicyAdj /> },
    ],
  },
]);

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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
