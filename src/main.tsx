import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PrivateRoutes from "./routes/privateRoute.tsx";
import PublicRoute from "./routes/publicRoute.tsx";
import { useAuthenticateAdmin, useAuthenticateUser } from "./hooks/useAuthenticate.ts";
import Layout from "./routes/layout.tsx";
import RockPopEtc from "./routes/category/rockpopetc.tsx";
import RSDExclusive from "./routes/category/RSDExclusive.tsx";
import Jazz from "./routes/category/jazz.tsx";
import OST from "./routes/category/ost.tsx";
import JPopCityPopAsia from "./routes/category/jpopCityPopAsia.tsx";
import KPop from "./routes/category/kpop.tsx";
import Merchandise from "./routes/category/merchandise.tsx";
import LogIn from "./routes/login.tsx";
import SignUp from "./routes/signup.tsx";
import Basket from "./routes/basket.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login", // member/login
        element: <LogIn />,
      },
      {
        path: "/signup", // member/signup
        element: <SignUp />,
      },
      {
        path: "/basket", // order/basket
        element: <Basket />,
      },
      {
        path: "/category/rock-pop-etc",
        element: <RockPopEtc />,
      },
      {
        path: "/category/rsd-exclusive",
        element: <RSDExclusive />,
      },
      {
        path: "/category/jazz",
        element: <Jazz />,
      },
      {
        path: "/category/ost",
        element: <OST />,
      },
      {
        path: "/category/kpop",
        element: <KPop />,
      },
      {
        path: "/category/jpop-citypop-asia",
        element: <JPopCityPopAsia />,
      },
      {
        path: "/category/merchandise",
        element: <Merchandise />,
      },
      useAuthenticateAdmin() && useAuthenticateUser() ? PrivateRoutes() : PublicRoute(),
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
