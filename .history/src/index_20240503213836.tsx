import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/Login/Login';
import NavBar from "./components/Header/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

