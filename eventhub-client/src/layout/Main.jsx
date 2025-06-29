import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;