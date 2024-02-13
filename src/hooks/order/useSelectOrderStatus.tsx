import { fbGetOrderStatus, fbUpdateOrderStatus } from "@/services/firebase/order";
import { useEffect, useState } from "react";

export default function useSelectOrderStatus(orderId: string) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    async function getStatus() {
      const order = await fbGetOrderStatus(orderId);
      if (order) {
        setSelectedStatus(order.status);
      }
    }
    getStatus();
  }, []);

  function onValueChange(value: string) {
    if (confirm(`해당 상품의 주문 상태를 ${value}으로 변경하시겠습니까?`)) {
      fbUpdateOrderStatus(orderId, value);
      setSelectedStatus(value);
    }
  }

  function onCancel() {
    setSelectedStatus((prevStatus) => prevStatus);
  }

  return { selectedStatus, onValueChange, onCancel };
}
