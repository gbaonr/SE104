import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/css/index.css";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/Login/Login";
import ResultsPage from "./pages/MatchResults/Results";
import FixturesPage from "./pages/MatchResults/Fixtures";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
    </Route>
  )
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
