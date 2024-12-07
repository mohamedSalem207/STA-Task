import { createRoot } from "react-dom/client";
import "./main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Default from "./layouts/default";
import NotFound from "./pages/not-found";
import Home from "./pages";
import Category from "./pages/category";
import { Provider } from "react-redux";
import { store } from "./store";
import "swiper/css"; //-
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-tooltip/dist/react-tooltip.css'

const router = createBrowserRouter([
  {
    path: "",
    element: <Default />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/categories/:id",
        element: <Category />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      theme="colored"
      pauseOnFocusLoss={false}
    />

    <RouterProvider router={router} />
  </Provider>
);
