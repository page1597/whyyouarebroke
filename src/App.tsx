import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PrivateRoutes from "./routes/privateRoute.tsx";
import PublicRoute from "./routes/publicRoute.tsx";
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
import { UserProvider } from "./context/userContext.tsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "./firebase.tsx";

export default function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isLoggedIn);

  useEffect(() => {
    // 로그인 상태 확인
    console.log("상태 변화 감지");
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        await getUser(user.uid).then((user) => {
          if (user) {
            setIsAdmin(user.type === "관리자");
          }
        });
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
        // setUser(null);
      }
    });
    // useAuth().then((response) => {
    //   setIsLoggedIn(response);
    // });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} />,
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
        isLoggedIn && isAdmin ? PrivateRoutes() : PublicRoute(isLoggedIn),
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
