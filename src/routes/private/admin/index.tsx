import { Navigate } from "react-router-dom";
import { lazy } from "react";
import Products from "./products";
const Orders = lazy(() => import("./order"));
const Product = lazy(() => import("./product"));
const AddProduct = lazy(() => import("./addProduct"));
const EditProduct = lazy(() => import("./editProduct"));

// 로그인 한 상태에서 판매자(관리자)가 볼 수 있는 화면
export default function PrivateRoutes() {
  return [
    { path: "/", element: <Products /> }, // 판매상품조회
    { path: "/order", element: <Orders /> }, // 주문조회
    { path: "/login", element: <Navigate to="/" replace /> },
    { path: "/signup", element: <Navigate to="/" replace /> },
    { path: "/product", element: <Product /> },
    { path: "/add-product", element: <AddProduct /> },
    { path: "/edit-product", element: <EditProduct /> },
  ];
}
