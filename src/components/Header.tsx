import { HeaderNavProps } from "@/types/navigation";
import Alert from "./alert";
import { useNavigate } from "react-router-dom";
import useLogOut from "@/hooks/auth/useLogOut";

function Header({ items, basketContext }: HeaderNavProps) {
  const navigate = useNavigate();
  const { logOut, isPending, setShowAlert, showAlert, alertContent } = useLogOut();
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
                        <>({basketContext.length})</>
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
        <div className="flex bg-zinc-800 justify-end py-1.5 items-center gap-2 px-3 text-nowrap">
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
                          <>({basketContext.length})</>
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
export default Header;
