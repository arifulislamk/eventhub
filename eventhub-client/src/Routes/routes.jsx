import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Events from "../pages/Events";
import AddEvent from "../pages/AddEvent";
import MyEvents from "../pages/MyEvents";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Home /> ,
        },
        {
            path: "/events",
            element: <Events />
        },
        {
            path: "/add-event",
            element: <AddEvent />
        },
        {
            path: "/my-events",
            element: <MyEvents />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Registration />
        }
    ]
  },
]);

export default router ;