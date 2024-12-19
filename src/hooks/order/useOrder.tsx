import { BasketProductType } from "@/types/product";
import useAddOrderMutation from "./useAddOrderMutation";
import { FieldValues } from "react-hook-form";
import { generateOrderNumber } from "@/lib/utils";
import { OrderStatusType } from "@/types/order";
import useShowAlert from "../useShowAlert";
import { paymentFormSchema } from "@/types/formSchemas/payment";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
export default function useOrder(
  userId: string | null | undefined,
  fieldValues: FieldValues,
  isAgreedTerm: boolean,
  orderProducts: BasketProductType[],
  checkIsOutOfStock: any,
  decreaseProductStock: any,
  increaseProductStock: any,
  setIsSuccess: Dispatch<SetStateAction<boolean>>
) {
  const { addOrder } = useAddOrderMutation();
  const { setShowAlert, showAlert, setAlertContent, alertContent } = useShowAlert();
  const navigate = useNavigate();

  async function onClickPayment() {
    const validation = paymentFormSchema.safeParse(fieldValues);

    if (!isAgreedTerm) {
      setShowAlert(true);
      setAlertContent({ title: "주문/결제", desc: "쇼핑몰 이용약관을 동의해주세요.", nav: null });
      return;
    }
    if (!validation.success) {
      setShowAlert(true);
      setAlertContent({ title: "주문/결제", desc: "모든 주문서 항목을 작성해주세요.", nav: null });
      return;
    }
    // 결제 전 재고 우선감소
    const isOutOfStock = await checkIsOutOfStock();
    if (isOutOfStock) {
      return;
    }
    await decreaseProductStock();

    /* 1. 가맹점 식별하기 */
    const IMP = window.IMP;
    IMP.init("imp24067853");

    const priceAmount = orderProducts.reduce((total, product) => total + product.quantity * product.price, 0);
    const buyerInfo = fieldValues;

    const data = {
      pg: "kakaopay", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `${generateOrderNumber(orderProducts[0].id)}`, // 주문번호
      amount: priceAmount, // 결제금액
      name: `${orderProducts[0].name} 외 ${orderProducts.length - 1}건`, // 주문명
      buyer_name: buyerInfo.buyer_name, // 구매자 이름
      buyer_tel: buyerInfo.buyer_tel, // 구매자 전화번호
      buyer_email: buyerInfo.buyer_email, // 구매자 이메일
      buyer_addr: buyerInfo.buyer_addr, // 구매자 주소
      buyer_postcode: buyerInfo.buyer_postcode, // 구매자 우편번호
    };
    IMP.request_pay(data, async (response: { success: any; merchant_uid: any; error_msg: any }) => {
      const { success, error_msg } = response;
      if (success) {
        addOrder({
          merchant_uid: data.merchant_uid,
          status: OrderStatusType.PURCHASE_CONFIRMED,
          amount: data.amount,
          name: data.name,
          products: orderProducts,
          orderedAt: +new Date(),
          buyer_uid: userId || null,
          buyer_name: data.buyer_name,
          buyer_tel: data.buyer_tel,
          buyer_email: data.buyer_email,
          buyer_addr: data.buyer_addr,
          buyer_postcode: data.buyer_postcode,
        });
        setIsSuccess(true);
        alert("주문이 완료되었습니다.");
        navigate("/order");
      } else {
        // 결제 취소
        increaseProductStock(orderProducts);
        alert(`${error_msg}`);
      }
    });
  }
  return { onClickPayment, setShowAlert, showAlert, alertContent };
}
