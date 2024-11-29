import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";

export const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: "",
  },
  {
    element: <DetailsPage />,
    path: "/movie/:id",
  },
]);
