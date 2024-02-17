import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSelectOrderStatus from "@/hooks/order/useSelectOrderStatus";
import { OrderStatusType } from "@/types/order";
import { memo } from "react";
import Alert from "./alert";

function SelectOrderStatus({ id }: { id: string }) {
  const { selectedStatus, onValueChange, setShowAlert, showAlert, alertContent, setConfirm } = useSelectOrderStatus(id);

  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} setConfirm={setConfirm} />
      <Select
        onValueChange={onValueChange}
        value={selectedStatus}
        disabled={selectedStatus == OrderStatusType.ORDER_CANCELLED}
      >
        <SelectTrigger>
          <SelectValue placeholder={selectedStatus} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(OrderStatusType).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
export default memo(SelectOrderStatus);
