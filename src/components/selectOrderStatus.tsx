import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSelectOrderStatus from "@/hooks/order/useSelectOrderStatus";
import { OrderStatusType } from "@/types/order";

export default function SelectOrderStatus({ id }: { id: string }) {
  const { selectedStatus, onValueChange, onCancel } = useSelectOrderStatus(id);

  return (
    <Select onValueChange={onValueChange} value={selectedStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedStatus} />
      </SelectTrigger>
      <SelectContent>
        {Object.values(OrderStatusType).map((status) => (
          <SelectItem key={status} value={status} onClick={onCancel}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
