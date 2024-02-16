import { fbGetOrderStatus, fbUpdateOrderStatus } from "@/services/firebase/order";
import { useCallback, useEffect, useState } from "react";

function useSelectOrderStatus(orderId: string) {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getStatus() {
      const order = await fbGetOrderStatus(orderId);
      if (order) {
        setSelectedStatus(order.status);
      }
    }
    getStatus();
  }, []);

  const onValueChange = useCallback(
    (value: string) => {
      if (confirm(`해당 상품의 주문 상태를 ${value}으로 변경하시겠습니까?`)) {
        fbUpdateOrderStatus(orderId, value);
        setSelectedStatus(value);
      }
    },
    [selectedStatus]
  );

  const onCancel = useCallback(() => {
    setSelectedStatus((prevStatus) => prevStatus);
  }, [selectedStatus]);

  return { selectedStatus, onValueChange, onCancel };
}
export default useSelectOrderStatus;
