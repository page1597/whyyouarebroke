import { fbAddOrder } from "@/services/firebase/order";
import { OrderType } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import useShowAlert from "../useShowAlert";

export default function useAddOrderMutation() {
  const { setShowAlert, showAlert, alertContent, setAlertContent } = useShowAlert();

  const { mutate } = useMutation({
    mutationKey: ["make order"],
    mutationFn: (order: OrderType) => fbAddOrder(order),
    onSuccess: () => {
      // setAlertContent({ title: "상품 주문", desc: "주문을 완료하였습니다.", nav: null });
      // setShowAlert(true);
    },
    onError: () => {
      // setAlertContent({ title: "상품 주문", desc: "주문을 실패하였습니다. 관리자에게 문의하세요.", nav: null });
      // setShowAlert(true);
    },
  });

  return { addOrder: mutate, setShowAlert, showAlert, alertContent, setAlertContent };
}
