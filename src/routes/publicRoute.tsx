// import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Products from "./products";
import MyPage from "./member/myPage";
import { useAuth } from "@/hooks/useAuth";
import { User } from "firebase/auth";
import { UserInfoType } from "@/types";
import LogIn from "./login";
import SignUp from "./signup";

// 로그인 한 상태에서 구매자가 볼 수 있는 화면
export default function PublicRoute(userInfo: UserInfoType | null) {
  console.log(userInfo);
  return {
    children: [
      { path: "/", element: <Products /> }, // 판매상품조회
      { path: "/mypage", element: userInfo ? <MyPage /> : <Navigate to="/login" replace /> }, // 회원만 접근 가능
      { path: "/login", element: userInfo ? <Navigate to="/" replace /> : <LogIn /> }, // 로그인 했으면 들어가지 못함.
      { path: "/signup", element: userInfo ? <Navigate to="/" replace /> : <SignUp /> }, // 로그인 했으면 들어가지 못함. 너무 느림

      // { path: "*", element: <Navigate to="/member/products" replace /> },
    ],
  };
}
