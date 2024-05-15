import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/css/index.css";
import TeamReg from "./features/TeamReg/TeamRegister";
import Layout from "components/Layout/Layout";
import Login from "features/sign-in/Login";
import Players from "features/Players/Players";

import { HomePage } from "./features/HomePage/routes";
import { FixturesPage } from "./features/Results/routes/Fixtures";
import { LeaderBoard } from "./features/Results/routes/LeaderBoard";
import { ResultsPage } from "./features/Results/routes/Results";
import { grey } from "@mui/material/colors";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/tables" element={<LeaderBoard />} />
      <Route path="/TeamReg" element={<TeamReg />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/players" element={<Players />} />
    </Route>,
  ),
);

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
