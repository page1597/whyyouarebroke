import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { firebaseAuth, getUser } from "@/services/firebase";
import { UserInfoType } from "@/types";
import { copyBasketlocalToDB } from "@/services/basket";
import { unsubscribe } from "diagnostics_channel";

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(async (currentUser) => {
      console.log("구독 시작: ", currentUser);
      if (currentUser) {
        await getUser(currentUser.uid).then((user) => {
          if (user) {
            setUser({
              // 비동기 동작..?
              id: currentUser.uid,
              type: user.type,
              name: user.name,
              email: user.email,
            });
            localStorage.setItem("user type", user.type); // 판매자이거나 구매자인 상태
            copyBasketlocalToDB(currentUser.uid); // localStorage에 있던 장바구니를 DB로 옮김
          }
          // localStorage.removeItem("basket"); // 이거 언제 해줘야하지..? 로그아웃 될때.
          // 로그인 -> 로그아웃 시 장바구니 비워야 함.
        });
      } else {
        setUser(null); // 로그아웃한 경우
        localStorage.removeItem("user type"); // 로그아웃 상태
        // localStorage.removeItem("basket");
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{user !== null && children}</AuthContext.Provider>;
}

export default AuthProvider;
