import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { createRoot } from 'react-dom/client';
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./pages/Layout";
import LoginPage from './pages/Login/Login';

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
    <RouterProvider router={router} />
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);