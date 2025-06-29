import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Events from "../pages/Events";
import AddEvent from "../pages/AddEvent";
import MyEvents from "../pages/MyEvents";

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
        }
    ]
  },
]);

export default router ;