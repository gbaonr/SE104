import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes, HashRouter as Router } from "react-router-dom";

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    // <BrowserRouter>
    //   <NavBar />

    //   <main className="py-1">
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //     </Routes>

    //   </main>
    // </BrowserRouter>
  );
};

export default App;

