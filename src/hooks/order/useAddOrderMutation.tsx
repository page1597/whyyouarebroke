import { fbAddOrder } from "@/services/firebase/order";
import { OrderType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

export default function useAddOrderMutation() {
  const { mutate } = useMutation({
    mutationKey: ["make order"],
    mutationFn: (order: OrderType) => fbAddOrder(order),
  });

  return { addOrder: mutate };
}
