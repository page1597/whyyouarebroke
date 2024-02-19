import { HeaderNavProps } from "@/types/navigation";
import useLogOutMutation from "@/hooks/auth/useLogOutMutation";
import Alert from "./alert";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import useBasket from "@/hooks/basket/useBasket";
function Header({ items }: HeaderNavProps) {
  const navigate = useNavigate();
  const { logOut, isPending, setShowAlert, showAlert, alertContent } = useLogOutMutation();
  const { getBasket } = useBasket();
  const basket = getBasket();
  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} />
      <div className="hidden md:flex bg-zinc-800 justify-end py-1.5 items-center px-3 gap-3">
        {items.length
          ? items.map((item) => (
              <div key={item.title} className="text-white flex text-sm flex-row">
                {item.title !== "로그아웃" ? (
                  <button onClick={() => navigate(item.href)}>
                    {item.title !== "장바구니" ? (
                      item.title
                    ) : (
                      <>
                        {item.title}
                        {basket && <>({basket.length})</>}
                      </>
                    )}
                  </button>
                ) : (
                  <button id={item.title} disabled={isPending} onClick={() => logOut()}>
                    {item.title}
                  </button>
                )}
              </div>
            ))
          : null}
      </div>

      {/* 모바일 헤더 */}
      <div className="md:hidden">
        <div className="flex bg-zinc-800 justify-end py-1.5 items-center gap-3 px-3">
          {items.length
            ? items.map((item) => (
                <div key={item.title} className="text-white text-sm">
                  {item.title !== "로그아웃" ? (
                    <button onClick={() => navigate(item.href)}>
                      {item.title !== "장바구니" ? (
                        item.title
                      ) : (
                        <>
                          {item.title}
                          {basket && <>({basket.length})</>}
                        </>
                      )}
                    </button>
                  ) : (
                    <button id={item.title} disabled={isPending} onClick={() => logOut()}>
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
export default memo(Header);
