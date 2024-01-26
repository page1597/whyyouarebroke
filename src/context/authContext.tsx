import { createContext, useContext, useState, useMemo, ReactNode } from "react";

// const userId = sessionStorage.getItem("id");
// const token = sessionStorage.getItem("token");
// isLogin: userId !== null && token !== null ? true : false
export const AuthContext = createContext({});
// auth에 들어가는 정보는 유저의 정보, AccessToken
// 그럼 RefreshToken은 어디에 저장할까요?

export function AuthProvider({ children }: { children: ReactNode }) {
  // const [isLogin, setIsLogin] = useState(userId !== null && token !== null ? true : false);
  const [auth, setAuth] = useState();

  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
