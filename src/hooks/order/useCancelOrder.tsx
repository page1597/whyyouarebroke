import { useCallback } from "react";
import useShowAlert from "../useShowAlert";

export default function useCancelOrder(cancelOrder: any) {
  const { setShowAlert, showAlert, setAlertContent, alertContent } = useShowAlert();
  const onCancelOrder = useCallback((orderId: string) => {
    cancelOrder(orderId);
    setShowAlert(true);
    setAlertContent({ title: "주문/결제", desc: "주문이 취소되었습니다.", nav: null });
  }, []);

  return {
    onCancelOrder,
    cancelShowAlert: showAlert,
    cancelAlertContent: alertContent,
    setCancelShowAlert: setShowAlert,
  };
}
