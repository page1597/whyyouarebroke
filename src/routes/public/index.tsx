import { Navigate } from "react-router-dom";
import { lazy } from "react";
import { UserInfoType } from "@/types/user";
import Products from "./products";
const Product = lazy(() => import("./product"));
const Orders = lazy(() => import("./orders"));
const MyPage = lazy(() => import("./member/myPage"));
const LogIn = lazy(() => import("./login"));
const SignUp = lazy(() => import("./signup"));

// 로그인 한 상태에서 구매자가 볼 수 있는 화면
export default function PublicRoutes(userInfo: UserInfoType | null) {
  return [
    { path: "/", element: <Products /> }, // 판매 상품 조회
    { path: "/product", element: <Product /> }, // 판매 상품 상세
    { path: "/order", element: userInfo ? <Orders /> : <Navigate to="/login" replace /> }, // 회원만 접근 가능
    { path: "/mypage", element: userInfo ? <MyPage /> : <Navigate to="/login" replace /> }, // 회원만 접근 가능
    { path: "/login", element: userInfo ? <Navigate to="/" replace /> : <LogIn /> }, // 로그인 시 접근 불가
    { path: "/signup", element: userInfo ? <Navigate to="/" replace /> : <SignUp /> }, // 로그인 시 접근 불가
    { path: "/add-product", element: <Navigate to="/login" replace /> },
    { path: "/edit-product", element: <Navigate to="/login" replace /> },
  ];
}
