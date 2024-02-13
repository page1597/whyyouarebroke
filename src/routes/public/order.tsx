import OrderList from "@/components/orderList";

export default function Order() {
  // 구매자 구매 확인 목록
  return (
    <div>
      주문조회
      <OrderList isAdmin={false} />
    </div>
  );
}
