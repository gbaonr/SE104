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

import { HomePage } from "./features/HomePage/routes";
import { FixturesPage } from "./features/Results/routes/Fixtures";
import { LeaderBoard } from "./features/Results/routes/LeaderBoard";
import { ResultsPage } from "./features/Results/routes/Results";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/tables" element={<LeaderBoard />} />
      <Route path="/TeamReg" element={<TeamReg />} />
    </Route>,
  ),
);

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Roboto",
    },
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
