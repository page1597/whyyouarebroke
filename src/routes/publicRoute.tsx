// import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Products from "./products";
import MyPage from "./member/myPage";
import { useAuth } from "@/hooks/useAuth";

// 로그인 한 상태에서 구매자가 볼 수 있는 화면
export default function PublicRoute(isLoggedIn: boolean) {
  return {
    children: [
      { path: "/", element: <Products /> }, // 판매상품조회
      { path: "/mypage", element: isLoggedIn ? <MyPage /> : <Navigate to="/login" replace /> }, // 회원만 접근 가능
      // { path: "*", element: <Navigate to="/member/products" replace /> },
    ],
  };
}
