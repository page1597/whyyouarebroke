import { fbAddOrder } from "@/services/firebase/order";
import { OrderType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

export default function useAddOrderMutation() {
  const { mutate } = useMutation({
    mutationKey: ["make order"],
    mutationFn: (order: OrderType) => fbAddOrder(order),
    onSuccess: () => {
      console.log("주문 성공");
      // navigate("/");
    },
    onError: (error) => {
      console.log("주문 실패", error);
    },
  });

  return { addOrder: mutate };
}
