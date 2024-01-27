import { useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PrivateRoutes from "./routes/private/admin/index.tsx";
import PublicRoute from "./routes/public/index.tsx";
import Layout from "./routes/index.tsx";
import RockPopEtc from "./routes/public/category/rockpopetc.tsx";
import RSDExclusive from "./routes/public/category/RSDExclusive.tsx";
import Jazz from "./routes/public/category/jazz.tsx";
import OST from "./routes/public/category/ost.tsx";
import JPopCityPopAsia from "./routes/public/category/jpopCityPopAsia.tsx";
import KPop from "./routes/public/category/kpop.tsx";
import Merchandise from "./routes/public/category/merchandise.tsx";
// import LogIn from "./routes/login.tsx";
// import SignUp from "./routes/signup.tsx";
import Basket from "./routes/public/basket.tsx";
import { AuthContext } from "./context/authContext.tsx";

export default function App() {
  const userInfo = useContext(AuthContext);
  const isAdmin = userInfo?.type === "관리자" ? true : false;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: "/login", // member/login
        //   element: <LogIn />,
        // },
        // {
        //   path: "/signup", // member/signup
        //   element: <SignUp />,
        // },
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
        isAdmin ? PrivateRoutes() : PublicRoute(userInfo),
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
