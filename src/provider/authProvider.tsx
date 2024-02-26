import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { UserInfoType } from "@/types/user";
import { firebaseAuth } from "@/services/firebase";
import { fbGetUser } from "@/services/firebase/user";
import { Loader2 } from "lucide-react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 첫 렌더링 시에는 실행하지 않음
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (currentUser) => {
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

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
