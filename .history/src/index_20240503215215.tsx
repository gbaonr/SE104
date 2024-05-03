import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/Login/Login';
import NavBar from "./components/Header/Header";
import Layout from "./pages/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

const App = () => {
  return (
    // <RouterProvider router={router} />
    <BrowserRouter>
      <NavBar />
      <main className="py-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>

      </main>
    </BrowserRouter>
  );
};

export default App;

