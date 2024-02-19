import { fbAddOrder } from "@/services/firebase/order";
import { OrderType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

export default function useAddOrderMutation() {
  const { mutate } = useMutation({
    mutationKey: ["make order"],
    mutationFn: (order: OrderType) => fbAddOrder(order),
    onSuccess: () => {
      alert("주문을 완료하였습니다.");
    },
    onError: (error) => {
      alert(`주문 실패: ${error}`);
    },
  });

  return { addOrder: mutate };
}
