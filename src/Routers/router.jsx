import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../components/Home";
import Login from "../Layouts/Login";
import SignUp from "../Layouts/SignUp";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../components/AddReview";
import MyReview from "../components/MyReview";
import AllReviews from "../components/AllReviews";
import ReviewDetails from "../components/ReviewDetails";
import MyWatchList from "../components/MyWatchList";
import UpdateReview from "../Layouts/UpdateReview";

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
      {
        path: "/reviews",
        element: <AllReviews></AllReviews>,
        loader: () => fetch("https://game-lens-server.vercel.app/reviews"),
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
    path: "/private/gameWatchList",
    element: (
      <PrivateRoute>
        <MyWatchList></MyWatchList>
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
    path: "/review/:id",
    element: (
      <PrivateRoute>
        <ReviewDetails></ReviewDetails>,
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(`https://game-lens-server.vercel.app/reviews/${params.id}`),
  },
  {
    path: "/updateReview/:id",
    element: (
      <PrivateRoute>
        <UpdateReview></UpdateReview>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(`https://game-lens-server.vercel.app/reviews/${params.id}`),
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
