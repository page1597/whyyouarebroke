import { UserInfoType } from "@/types";
import { createContext, useState, useMemo, ReactNode } from "react";
export type UserContextType = {
  user?: UserInfoType;
  setUser: (userInfo: UserInfoType) => void;
};
// const userId = sessionStorage.getItem("id");
// const token = sessionStorage.getItem("token");
// isLogin: userId !== null && token !== null ? true : false
export const UserContext = createContext<UserContextType | undefined>(undefined);
// auth에 들어가는 정보는 유저의 정보, AccessToken
// 그럼 RefreshToken은 어디에 저장할까요?

export function UserProvider({ children }: { children: ReactNode }) {
  // const [isLogin, setIsLogin] = useState(userId !== null && token !== null ? true : false);
  const [user, setUser] = useState<UserInfoType>();

  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
