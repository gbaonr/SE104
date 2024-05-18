import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "features/Auth/Login";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";

import { grey } from "@mui/material/colors";
import { HomePage } from "./features/User/routes/HomePage";
import { FixturesPage } from "./features/User/routes/Fixtures";
import { LeaderBoard } from "./features/User/routes/LeaderBoard";
import { ResultsPage } from "./features/User/routes/Results";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import { LayoutUser } from "features/User/components/Layouts/Layout";
import { LayoutAdmin } from "features/Admin/components/Layouts/Layout";
import { HomePageRoute } from "features/Admin/routes/HomePage";
import { ClubManagerRoute } from "features/Admin/routes/ClubManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/results", element: <ResultsPage /> },
      { path: "/fixtures", element: <FixturesPage /> },
      { path: "/tables", element: <LeaderBoard /> },
      { path: "/sign-in", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <HomePageRoute /> },
      { path: "/admin/teams", element: <ClubManagerRoute /> },
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
