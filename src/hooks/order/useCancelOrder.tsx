export default function useCancelOrder(cancelOrder: any) {
  function onCancelOrder(orderId: string) {
    var confirmation = confirm("주문을 취소하시겠습니까?");

    if (confirmation) {
      cancelOrder(orderId);
    }
  }
  return { onCancelOrder };
}
