import OrderList from "@/components/orderList";
import { Helmet } from "react-helmet";

export default function Order() {
  // 구매자 구매 확인 목록
  return (
    <>
      <Helmet>
        <title>주문조회</title>
      </Helmet>
      <h3 className="text-xl">주문조회</h3>
      <OrderList isAdmin={false} />
    </>
  );
}
