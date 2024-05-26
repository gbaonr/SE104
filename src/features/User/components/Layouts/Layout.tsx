import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.css";
import { Box, Container } from "@mui/material";

export const LayoutUser = () => {
  return (
    <>
      <Box
        sx={{
          // min height should be 100vh subtracting the height of the footer
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <NavBar />
        <Outlet />
      </Box>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>
  );
};
