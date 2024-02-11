import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { firebaseAuth, getUser } from "@/services/firebase";
import { UserInfoType } from "@/types";
import { copyBasketlocalToDB } from "@/services/basket";

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (currentUser) => {
      console.log("구독 시작: ", currentUser);
      if (currentUser) {
        await getUser(currentUser.uid)
          .then((userInfo) => {
            if (userInfo) {
              setUser({
                id: currentUser.uid,
                type: userInfo.type,
                name: userInfo.name,
                email: userInfo.email,
              });
              localStorage.setItem("user type", userInfo.type);
              copyBasketlocalToDB(currentUser.uid);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUser(null);
        localStorage.removeItem("user type");
        localStorage.removeItem("basket"); // 로그아웃 시 장바구니 초기화
        setLoading(false);
      }
    });

    return unsubscribe; // cleanup 함수에서 이벤트 구독 해제
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
