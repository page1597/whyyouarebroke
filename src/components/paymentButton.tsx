import { Button } from "./ui/button";
import { FieldValues } from "react-hook-form";
import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction, useEffect } from "react";
import useOrderProcessing from "@/hooks/order/useOrderProcessing";
import useOrder from "@/hooks/order/useOrder";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function PaymentButton({
  fieldValues,
  orderProducts,
  isAgreedTerm,
  setIsAgreedTerm,
  userId,
}: {
  fieldValues: FieldValues;
  orderProducts: BasketProductType[];
  isAgreedTerm: boolean;
  setIsAgreedTerm: Dispatch<SetStateAction<boolean>>;
  userId?: string | null;
}) {
  const { checkIsOutOfStock, decreaseProductStock, increaseProductStock } = useOrderProcessing(userId);
  const { onClickPayment } = useOrder(
    userId,
    fieldValues,
    isAgreedTerm,
    orderProducts,
    checkIsOutOfStock,
    decreaseProductStock,
    increaseProductStock
  );

  useEffect(() => {
    setIsAgreedTerm(false);
  }, []);

  return (
    <Button id="payment" className="bg-zinc-700 hover:bg-zinc-800" onClick={onClickPayment}>
      결제하기
    </Button>
  );
}
