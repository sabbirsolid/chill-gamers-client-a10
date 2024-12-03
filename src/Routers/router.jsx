import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import Home from "../components/Home";
import Login from "../Layouts/Login";
import SignUp from "../Layouts/SignUp";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../components/AddReview";
import MyReview from "../components/MyReview";
import GameWatchList from "../components/GameWatchList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/private/addReviews",
    element: (
      <PrivateRoute>
        <AddReview></AddReview>
      </PrivateRoute>
    ),
  },
  {
    path: "/private/myReview",
    element: (
      <PrivateRoute>
        <MyReview></MyReview>
      </PrivateRoute>
    ),
  },
  {
    path: "/private/gameWatchList",
    element: (
      <PrivateRoute>
        <GameWatchList></GameWatchList>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
