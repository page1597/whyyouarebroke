import { Suspense, lazy, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PrivateRoutes from "./routes/private/admin/index.tsx";
import PublicRoute from "./routes/public/index.tsx";
import { AuthContext } from "./context/authContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const userInfo = useContext(AuthContext);
  const isAdmin = userInfo?.type === "관리자" ? true : false;

  const queryClient = new QueryClient();

  const Layout = lazy(() => import("./routes/index"));
  const Basket = lazy(() => import("./routes/public/basket"));
  const RockPopEtc = lazy(() => import("./routes/public/category/rockpopetc"));
  const RSDExclusive = lazy(() => import("./routes/public/category/RSDExclusive"));
  const Jazz = lazy(() => import("./routes/public/category/jazz"));
  const OST = lazy(() => import("./routes/public/category/ost"));
  const KPop = lazy(() => import("./routes/public/category/kpop"));
  const Merchandise = lazy(() => import("./routes/public/category/merchandise"));
  const JPopCityPopAsia = lazy(() => import("./routes/public/category/jpopCityPopAsia"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <Layout />
        </Suspense>
      ),
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
