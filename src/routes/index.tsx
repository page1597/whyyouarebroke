// root of the project
import DocsSidebarNav from "@/components/layout/sidebar";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/errorFallback";
import Header from "@/components/layout/Header";
import { HeaderNavItem } from "@/types/navigation";
import { Helmet } from "react-helmet";
import useBasket from "@/hooks/basket/useBasket";
import { BasketProductType } from "@/types/product";
import SearchDrawer from "@/components/customUI/searchDrawer";
import Logo from "@/components/layout/logo";

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

  const headerNav: HeaderNavItem[] = [
    !userInfo ? { title: "로그인", href: "/login" } : { title: "로그아웃", href: "/" },
    !isAdmin ? { title: "장바구니", href: "/basket" } : { title: "", href: "" },
    { title: "주문조회", href: "/order" },
    !userInfo ? { title: "회원가입", href: "/signup" } : { title: "", href: "" },
    !isAdmin ? { title: "마이페이지", href: "/mypage" } : { title: "", href: "" },
  ].filter((item) => item.title !== "" && item.href !== "");

  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
        <meta name="description" content="whyyouarebroke" />
        <meta name="keywords" content="whyyouarebroke" />
        <meta property="og:title" content="whyyouarebroke" />
        <meta property="og:description" content="whyyouarebroke" />
        <meta property="og:url" content="https://d35k4wnncttxix.cloudfront.net/" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/whyyouarebroke-cee8d.appspot.com/o/logo%2Flogo.png?alt=media&token=4f12b6be-3111-4537-b4b7-898f36093bd3"
        />
      </Helmet>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate("/")}>
        <div className="w-full flex flex-col h-screen">
          <Header items={headerNav} basketContext={basketContext} />
          <div className="md:px-12 md:py-8 md:flex">
            {/* desktop */}
            <div className="hidden md:inline-block">
              <Logo width={120} height={101.72} className="flex flex-col mb-7 cursor-pointer" />
              <DocsSidebarNav items={sidebarNav} />
            </div>
            {/* responsive */}
            <div className="md:hidden px-5 py-3 flex justify-between items-center">
              <DocsSidebarNav items={sidebarNav} />
              <Logo width={60} height={60} />
              <SearchDrawer />
            </div>
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
