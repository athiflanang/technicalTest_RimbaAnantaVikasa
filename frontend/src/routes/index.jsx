import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "../views/homepage";
import AddUser from "../views/addUser";
import UpdateUser from "../views/updateUser";

const url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage url={url} />,
  },
  {
    path: "/add",
    element: <AddUser url={url} />,
  },
  {
    path: "/edit/:id",
    element: <UpdateUser url={url} />,
  },
]);

export default router;
