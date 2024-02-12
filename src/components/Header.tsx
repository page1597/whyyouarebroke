import { Link } from "react-router-dom";
import { HeaderNavProps } from "@/types/navigation";
import useLogOutMutation from "@/hooks/auth/useLogOutMutation";

export function Header({ items }: HeaderNavProps) {
  const { logOut, isPending } = useLogOutMutation();
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
                  <button disabled={isPending} onClick={() => logOut()}>
                    {item.title}
                  </button>
                )}
              </div>
            ))
          : null}
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
                    <button disabled={isPending} onClick={() => logOut()}>
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
