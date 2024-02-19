import { fbGetOrderStatus, fbUpdateOrderStatus } from "@/services/firebase/order";
import { useCallback, useEffect, useState } from "react";
import useShowAlert from "../useShowAlert";

export default function useSelectOrderStatus(orderId: string) {
  const [selectBeforeConfirm, setSelectBeforeConfirm] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const { setShowAlert, showAlert, setAlertContent, alertContent, setConfirm, confirm } = useShowAlert();
  useEffect(() => {
    async function getStatus() {
      const order = await fbGetOrderStatus(orderId);
      if (order) {
        setSelectedStatus(order.status);
      }
    }
    getStatus();
  }, []);

  useEffect(() => {
    if (confirm && selectBeforeConfirm) {
      setSelectedStatus(selectBeforeConfirm);
      fbUpdateOrderStatus(orderId, selectBeforeConfirm);
    }
  }, [confirm]);

  const onValueChange = useCallback(
    (value: string) => {
      setSelectBeforeConfirm(value);
      setShowAlert(true);
      setAlertContent({
        title: "주문/결제",
        desc: `해당 상품의 주문 상태를 '${value}'으로 변경하시겠습니까?`,
        nav: null,
      });
    },
    [selectedStatus]
  );

  // const onCancel = useCallback(() => {
  //   setSelectedStatus((prevStatus) => prevStatus);
  // }, [selectedStatus]);

  return { selectedStatus, onValueChange, setShowAlert, showAlert, alertContent, setConfirm, confirm };
}
