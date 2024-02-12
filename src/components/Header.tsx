import { HeaderNavItem } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "@/services/firebase";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SearchFilterProducts from "./searchFilterProducts";

type HeaderNavProps = {
  items: HeaderNavItem[];
};

export function Header({ items }: HeaderNavProps) {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["log out"], // Query Key
    mutationFn: () => logOut(), // 비동기 작업을 수행하는 함수
    onSuccess: () => {
      console.log("로그아웃 성공");
      alert("로그아웃 하였습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
      alert("로그아웃하지 못했습니다.");
    },
  });

  return (
    <>
      <div className="hidden md:flex bg-zinc-800 justify-end py-1.5 items-center px-3 gap-3">
        {items.length
          ? items.map((item, index) => (
              <div key={index} className="text-white flex text-sm flex-row">
                {item.title !== "로그아웃" ? (
                  <Link to={item.href}>
                    {item.title !== "장바구니" ? (
                      item.title
                    ) : (
                      <>
                        {item.title}
                        {/* {basket && <>({basket.length})</>} */}
                      </>
                    )}
                  </Link>
                ) : (
                  <button disabled={isPending} onClick={() => mutate()}>
                    {item.title}
                  </button>
                )}
              </div>
            ))
          : null}
        {/* <Sheet>
          <SheetTrigger>
            <input className="w-42 rounded-2xl text-sm px-2 py-1 border-none placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
          </SheetTrigger>
          <SheetContent side={"top"}>
            <SheetHeader>
              <SheetTitle>상품 검색</SheetTitle>
            </SheetHeader>
            <SearchFilterProducts />
          </SheetContent>
        </Sheet> */}
      </div>

      {/* 모바일 헤더(로고까지 포함) */}
      <div className="md:hidden">
        <div className="flex bg-zinc-800 justify-end py-1.5 items-center gap-3 px-3">
          {items.length
            ? items.map((item, index) => (
                <div key={index} className="text-white text-sm">
                  {item.title !== "로그아웃" ? (
                    <Link to={item.href}>
                      {item.title !== "장바구니" ? (
                        item.title
                      ) : (
                        <>
                          {item.title}
                          {/* {basket && <>({basket.length})</>} */}
                        </>
                      )}
                    </Link>
                  ) : (
                    <button disabled={isPending} onClick={() => mutate()}>
                      {item.title}
                    </button>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
