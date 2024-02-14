import OrderList from "@/components/orderList";

export default function Order() {
  // 구매자 구매 확인 목록
  return (
    <>
      <h3 className="text-xl">주문조회</h3>
      <OrderList isAdmin={false} />
    </>
  );
}
