import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
// import { matchBasketlocalToDB } from "@/services/local/basket";
import { UserInfoType } from "@/types/user";
import { firebaseAuth } from "@/services/firebase";
import { fbGetUser } from "@/services/firebase/user";
import useBasket from "@/hooks/basket/useBasket";

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const { matchBasketlocalToDB } = useBasket();

  // 이전에 호출되었는지 여부를 저장하는 useRef

  useEffect(() => {
    // 첫 렌더링 시에는 실행하지 않음
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (currentUser) => {
      console.log("구독 시작: ", currentUser);
      if (currentUser) {
        await fbGetUser(currentUser.uid)
          .then((userInfo) => {
            if (userInfo) {
              setUser({
                id: currentUser.uid,
                type: userInfo.type,
                name: userInfo.name,
                email: userInfo.email,
              });
              localStorage.setItem("user type", userInfo.type);
              sessionStorage.setItem("loggedIn", "yes");
              // copyBasketlocalToDB(currentUser.uid);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUser(null);
        localStorage.removeItem("user type");
        if (sessionStorage.getItem("loggedIn") == "yes") {
          sessionStorage.removeItem("basket");
          sessionStorage.removeItem("loggedIn");
        }
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      matchBasketlocalToDB(user.id!);
    }
  }, [user]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
