import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/Login/Login';
import NavBar from "./components/Header/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

