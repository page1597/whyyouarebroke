import OrderList from "@/components/orderList";

export default function Order() {
  // 관리자(판매자) 판매상품 리스트 목록
  return (
    <>
      <h3>주문 조회</h3>
      <OrderList isAdmin={true} />
    </>
  );
}
