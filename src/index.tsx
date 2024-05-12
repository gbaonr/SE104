import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/Login/Login";
import ResultsPage from "./pages/Results/Results";
import "./assets/css/index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/results" element={<ResultsPage />} />
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
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
