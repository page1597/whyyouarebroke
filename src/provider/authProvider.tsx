import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { firebaseAuth, getUser } from "@/services/firebase";
import { UserInfoType } from "@/types";
import { matchBasketlocalToDB } from "@/services/basket";

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
              // copyBasketlocalToDB(currentUser.uid);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setUser(null);
        localStorage.removeItem("user type");
        localStorage.removeItem("basket");
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
