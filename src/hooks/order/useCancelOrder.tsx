import { useCallback } from "react";
import useShowAlert from "../useShowAlert";

export default function useCancelOrder(cancelOrder: any) {
  const { setShowAlert, showAlert, setAlertContent, alertContent } = useShowAlert();
  const onCancelOrder = useCallback((orderId: string, orderName: string) => {
    var confirmation = confirm(`${orderName}의 주문을 취소하시겠습니까?`);

    if (confirmation) {
      cancelOrder(orderId);
      setShowAlert(true);
      setAlertContent({ title: "주문/결제", desc: "주문이 취소되었습니다.", nav: null });
    }
  }, []);

  return { onCancelOrder, showAlert, alertContent, setShowAlert };
}
