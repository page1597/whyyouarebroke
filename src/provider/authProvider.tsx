import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { firebaseAuth, getUser } from "@/services/firebase";
import { UserInfoType } from "@/types";
import { BasketContext } from "@/context/basketContext";

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);

  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }

  const { setBasket } = contextValue;

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (currentUser) => {
      console.log("구독 시작: ", currentUser);
      if (currentUser) {
        await getUser(currentUser.uid).then((user) => {
          if (user) {
            setUser({
              type: user.type,
              name: user.name,
              email: user.email,
            });
            localStorage.setItem("user type", user.type); // 판매자이거나 구매자인 상태
          }
        });
      } else {
        setUser(null);
        localStorage.removeItem("user type"); // 로그아웃 상태
        localStorage.removeItem("basket");
        setBasket(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
