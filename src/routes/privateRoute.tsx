// import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Orders from "./admin/orders";
import Products from "./admin/products";

// 로그인 한 상태에서 판매자(관리자)가 볼 수 있는 화면
export default function PrivateRoutes() {
  return {
    children: [
      { path: "/", element: <Products /> }, // 판매상품조회
      { path: "/orders", element: <Orders /> }, // 주문조회
      { path: "/login", element: <Navigate to="/" replace /> }, // 로그인 했으면 들어가지 못함.
      { path: "/signup", element: <Navigate to="/" replace /> }, // 로그인 했으면 들어가지 못함. 너무 느림

      // { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}
