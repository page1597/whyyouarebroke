import OrderList from "@/components/orderList";
import { Helmet } from "react-helmet";
export default function Order() {
  // 관리자(판매자) 판매상품 리스트 목록
  return (
    <>
      <Helmet>
        <title>주문조회</title>
      </Helmet>
      <h3>주문 조회</h3>
      <OrderList isAdmin={true} />
    </>
  );
}
