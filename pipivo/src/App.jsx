/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "firebase/auth";
import { ToastContainer } from "react-toastify";
import { AuthorizationPage } from "./pages";

import "react-range-slider-input/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home";
import SearchPage from "./pages/searchPage";
import RatedPage from "./pages/ratedPage";
import AddBeerPage from "./pages/addBeer/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "/auth",
    element: <AuthorizationPage />,
  },
  {
    path: "/rated",
    element: <RatedPage />,
  },
  {
    path: "/add",
    element: <AddBeerPage />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
