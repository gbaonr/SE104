import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export const LayoutAdmin = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
