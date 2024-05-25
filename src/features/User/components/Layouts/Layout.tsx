import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.css";

export const LayoutUser = () => {
  return (
    <>
      <NavBar />
      <Outlet />
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
