// root of the project
import DocsSidebarNav from "@/components/sidebar";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import logo from "src/assets/logo.webp";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/errorFallback";
import Header from "@/components/Header";
import { HeaderNavItem } from "@/types/navigation";
import { Helmet } from "react-helmet";
import useBasket from "@/hooks/basket/useBasket";
import { BasketProductType } from "@/types/product";

export const sidebarNav = [
  {
    title: "ROCK/POP/ETC",
    href: "/category/rock-pop-etc",
  },
  {
    title: "HIP HOP/R&B",
    href: "/category/hiphop-r&b",
  },
  {
    title: "JAZZ",
    href: "/category/jazz",
  },
  {
    title: "OST",
    href: "/category/ost",
  },
  {
    title: "K-POP",
    href: "/category/kpop",
  },
  {
    title: "J-POP/CITY POP/ASIA",
    href: "/category/jpop-citypop-asia",
  },
  {
    title: "MERCHANDISE",
    href: "/category/merchandise",
  },
];

type ContextType = {
  basketContext: BasketProductType[];
  setBasketContext: Dispatch<SetStateAction<BasketProductType[]>>;
};

export default function Layout() {
  const userInfo = useContext(AuthContext);
  const isAdmin = userInfo?.type === "관리자" ? true : false;
  const navigate = useNavigate();
  const { getBasket } = useBasket();
  const loadedBasket = getBasket();
  const [basketContext, setBasketContext] = useState<BasketProductType[]>(loadedBasket);
  const { matchBasketlocalToDB } = useBasket(setBasketContext);

  // 장바구니 전역 상태 초기화
  useEffect(() => {
    if (userInfo?.id) {
      matchBasketlocalToDB(userInfo?.id);
    }
    setBasketContext([]);
  }, [userInfo]);

  // 전역관리 유저타입 저장
  const headerNav: HeaderNavItem[] = [
    userInfo ? { title: "로그아웃", href: "/" } : { title: "로그인", href: "/login" },
    !isAdmin ? { title: "장바구니", href: "/basket" } : { title: "", href: "" },
    { title: "주문조회", href: "/order" },
    !userInfo ? { title: "회원가입", href: "/signup" } : { title: "", href: "" },
    !isAdmin ? { title: "마이페이지", href: "/mypage" } : { title: "", href: "" },
    // isAdmin && { title: "주문조회", href: "/orders" },
  ].filter((item) => item.title !== "" && item.href !== "");

  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
      </Helmet>
      <Helmet>
        <meta name="description" content="whyyouarebroke" />
        <meta name="keywords" content="whyyouarebroke" />
      </Helmet>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate("/")}>
        <div className="w-full flex flex-col h-screen">
          <Header items={headerNav} basketContext={basketContext} />
          {/* 반응형 구현 */}
          <div className="md:px-12 md:py-8 md:flex">
            <div className="hidden md:inline-block">
              <div className="flex flex-col mb-7 cursor-pointer" onClick={() => navigate("/")}>
                <img id="logo" src={logo} width={120} height={101.72} alt={"logo"} />
              </div>
              <DocsSidebarNav items={sidebarNav} />
            </div>

            <div className="md:hidden px-5 py-3 flex justify-between items-center">
              <DocsSidebarNav items={sidebarNav} />
              <div onClick={() => navigate("/")} className="cursor-pointer">
                <img id="logo" src={logo} width={60} height={60} alt={"logo"} />
              </div>
              {/* <DrawerRight direction="right">
              <DrawerRightTrigger name="search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </DrawerRightTrigger>
              <DrawerRightContent className="w-[300px]">
                <SearchFilterProducts />
              </DrawerRightContent>
            </DrawerRight> */}
              <div className="w-8" />
            </div>
            {/* <div className="md:flex-grow h-full px-6"> */}
            <div className="md:flex-grow md:px-0 h-full px-5 overflow-x-clip">
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate("/")}>
                <Outlet context={{ basketContext, setBasketContext } satisfies ContextType} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
export function useBasketContext() {
  return useOutletContext<ContextType>();
}
