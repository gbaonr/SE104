import { Outlet } from "react-router-dom"
import NavBar from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

export default function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}
