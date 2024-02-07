import { Navigate } from "react-router-dom";
import { lazy } from "react";

// 로그인 한 상태에서 판매자(관리자)가 볼 수 있는 화면
export default function PrivateRoutes() {
  const Products = lazy(() => import("./products"));
  const Orders = lazy(() => import("./order"));
  const Product = lazy(() => import("./product"));
  const AddProduct = lazy(() => import("./addProduct"));
  const EditProduct = lazy(() => import("./editProduct"));

  return [
    { path: "/", element: <Products /> }, // 판매상품조회
    { path: "/orders", element: <Orders /> }, // 주문조회
    { path: "/category/test", elemeng: <div>test</div> },
    { path: "/login", element: <Navigate to="/" replace /> }, // 로그인 했으면 들어가지 못함.
    { path: "/signup", element: <Navigate to="/" replace /> }, // 로그인 했으면 들어가지 못함. 너무 느림
    { path: "/product", element: <Product /> },
    { path: "/add-product", element: <AddProduct /> },
    { path: "/edit-product", element: <EditProduct /> },
    // { path: "*", element: <Navigate to="/" replace /> },
  ];
}
