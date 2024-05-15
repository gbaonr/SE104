import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "features/Auth/Login";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/css/index.css";

import { grey } from "@mui/material/colors";
import { HomePage } from "./features/Home/routes";
import { FixturesPage } from "./features/Results/routes/Fixtures";
import { LeaderBoard } from "./features/Results/routes/LeaderBoard";
import { ResultsPage } from "./features/Results/routes/Results";

import Footer from "components/Layouts/Footer";
import NavBar from "components/Layouts/NavBar";
import { Outlet } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/tables" element={<LeaderBoard />} />
      {/* <Route path="/TeamReg" element={<TeamReg />} /> */}
      <Route path="/sign-in" element={<Login />} />
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
