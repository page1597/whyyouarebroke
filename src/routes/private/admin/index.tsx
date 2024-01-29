// import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Orders from "./orders";
import Products from "./products";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";

// 로그인 한 상태에서 판매자(관리자)가 볼 수 있는 화면
export default function PrivateRoutes() {
  return {
    children: [
      { path: "/", element: <Products /> }, // 판매상품조회
      { path: "/orders", element: <Orders /> }, // 주문조회
      { path: "/login", element: <Navigate to="/" replace /> }, // 로그인 했으면 들어가지 못함.
      { path: "/signup", element: <Navigate to="/" replace /> }, // 로그인 했으면 들어가지 못함. 너무 느림
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product", element: <EditProduct /> },

      // { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}
