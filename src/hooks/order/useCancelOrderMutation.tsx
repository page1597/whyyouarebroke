import { fbUpdateOrderStatus } from "@/services/firebase/order";
import { OrderStatusType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import useShowAlert from "../useShowAlert";

export default function useCancelOrderMutation(refetch: () => void) {
  const { setShowAlert, setAlertContent } = useShowAlert();
  const { mutate } = useMutation({
    mutationKey: ["cancel order"],
    mutationFn: (orderId: string) => fbUpdateOrderStatus(orderId, OrderStatusType.ORDER_CANCELLED),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert(`주문 취소 실패: ${error}`);
      setAlertContent({ title: "주문 취소", desc: "주문 취소에 실패했습니다.", nav: null });
      setShowAlert(true);
    },
  });
  return { cancelOrder: mutate };
}
