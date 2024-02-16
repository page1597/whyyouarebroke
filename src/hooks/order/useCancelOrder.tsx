import { useCallback } from "react";

function useCancelOrder(cancelOrder: any) {
  const onCancelOrder = useCallback((orderId: string, orderName: string) => {
    var confirmation = confirm(`${orderName}의 주문을 취소하시겠습니까?`);

    if (confirmation) {
      cancelOrder(orderId);
      alert("주문이 취소되었습니다.");
    }
  }, []);

  return { onCancelOrder };
}
export default useCancelOrder;
