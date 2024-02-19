import { Link } from "react-router-dom";
import { HeaderNavProps } from "@/types/navigation";
import useLogOutMutation from "@/hooks/auth/useLogOutMutation";
import Alert from "./alert";

export default function Header({ items }: HeaderNavProps) {
  const { logOut, isPending, setShowAlert, showAlert, alertContent } = useLogOutMutation();
  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} />
      <div className="hidden md:flex bg-zinc-800 justify-end py-1.5 items-center px-3 gap-3">
        {items.length
          ? items.map((item) => (
              <div key={item.title} className="text-white flex text-sm flex-row">
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
