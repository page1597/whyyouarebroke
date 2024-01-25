// import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Products from "./products";
import MyPage from "./member/myPage";
import { useAuthenticateUser } from "@/hooks/useAuthenticate";

// 로그인 한 상태에서 구매자가 볼 수 있는 화면
export default function PublicRoute() {
  return {
    children: [
      { path: "/", element: <Products /> }, // 판매상품조회
      { path: "/mypage", element: useAuthenticateUser() ? <MyPage /> : <Navigate to="/login" replace /> }, // 회원만 접근 가능
      // { path: "*", element: <Navigate to="/member/products" replace /> },
    ],
  };
}
