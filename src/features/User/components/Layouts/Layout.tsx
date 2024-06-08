import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.css";
import { Box, Container } from "@mui/material";
import { Club } from "features/Admin/components/ClubManager/apis/types";

type LayoutUserProps = {
  clubs: Club[];
};

export const LayoutUser = ({ clubs }: LayoutUserProps) => {
  return (
    <>
      <Box
        sx={{
          // min height should be 100vh subtracting the height of the footer
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <NavBar clubs={clubs} />
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
