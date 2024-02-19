import { fbUpdateOrderStatus } from "@/services/firebase/order";
import { OrderStatusType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

export default function useCancelOrderMutation(refetch: () => void) {
  const { mutate } = useMutation({
    mutationKey: ["cancel order"],
    mutationFn: (orderId: string) => fbUpdateOrderStatus(orderId, OrderStatusType.ORDER_CANCELLED),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      // console.log("주문 취소 실패", error);
      alert(`주문 취소 실패: ${error}`);
    },
  });
  return { cancelOrder: mutate };
}
