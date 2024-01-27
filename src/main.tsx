import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import AuthProvider from "./provider/authProvider.tsx";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/login", // member/login
//         element: <LogIn />,
//       },
//       {
//         path: "/signup", // member/signup
//         element: <SignUp />,
//       },
//       {
//         path: "/basket", // order/basket
//         element: <Basket />,
//       },
//       {
//         path: "/category/rock-pop-etc",
//         element: <RockPopEtc />,
//       },
//       {
//         path: "/category/rsd-exclusive",
//         element: <RSDExclusive />,
//       },
//       {
//         path: "/category/jazz",
//         element: <Jazz />,
//       },
//       {
//         path: "/category/ost",
//         element: <OST />,
//       },
//       {
//         path: "/category/kpop",
//         element: <KPop />,
//       },
//       {
//         path: "/category/jpop-citypop-asia",
//         element: <JPopCityPopAsia />,
//       },
//       {
//         path: "/category/merchandise",
//         element: <Merchandise />,
//       },

//       useAuth() ? PrivateRoutes() : PublicRoute(),

//       // 이렇게 해도 되는건가..?
//       // true && useAuth() ? PrivateRoutes() : PublicRoute(),
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <UserProvider> */}
    {/* 전역 상태 공유: 이 안에서 useUser()를 실행하면 auth와 setAuth 사용 가능 */}
    {/* <RouterProvider router={router} /> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </UserProvider> */}
  </React.StrictMode>
);
