import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes, HashRouter as Router } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/Login/Login';
import { createRoot } from 'react-dom/client';
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
    <RouterProvider router={router}>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);



