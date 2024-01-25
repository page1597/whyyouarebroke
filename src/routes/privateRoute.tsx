// import { lazy } from "react";
import Orders from "./admin/orders";
import Products from "./admin/products";

// 로그인 한 상태에서 판매자(관리자)가 볼 수 있는 화면
export default function PrivateRoutes() {
  return {
    children: [
      { path: "/", element: <Products /> }, // 판매상품조회
      { path: "/orders", element: <Orders /> },
      // { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}
