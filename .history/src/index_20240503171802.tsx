import React from 'react'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from './pages/Login/Login';

import NavBar from "./components/Header/Header";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

