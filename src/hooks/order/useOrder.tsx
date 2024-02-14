import { BasketProductType } from "@/types/product";
import useAddOrderMutation from "./useAddOrderMutation";
import { FieldValues } from "react-hook-form";
import { generateOrderNumber } from "@/lib/utils";
import { OrderStatusType } from "@/types/order";

export default function useOrder(
  userId: string | null | undefined,
  fieldValues: FieldValues,
  isAgreedTerm: boolean,
  orderProducts: BasketProductType[],
  checkIsOutOfStock: any,
  decreaseProductStock: any,
  increaseProductStock: any
) {
  const { addOrder } = useAddOrderMutation();

  async function onClickPayment() {
    if (!isAgreedTerm) {
      alert("쇼핑몰 이용약관을 동의해주세요.");
      return;
    }

    // 결제 전 재고 우선감소
    const isOutOfStock = await checkIsOutOfStock(orderProducts);
    if (isOutOfStock) {
      return;
    }

    await decreaseProductStock(orderProducts);

    /* 1. 가맹점 식별하기 */
    const IMP = window.IMP;
    IMP.init("imp24067853");

    const buyerInfo = fieldValues;
    let priceAmount = 0;

    orderProducts.forEach((products) => {
      priceAmount += products.quantity * products.price;
    });
    console.log(priceAmount);

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "html5_inicis", // PG사
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
    console.log(data);

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, async (response: { success: any; merchant_uid: any; error_msg: any }) => {
      const { success, merchant_uid, error_msg } = response;
      // console.log(success, merchant_uid);
      if (success) {
        alert("결제 성공");
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
      } else {
        // 결제 취소
        increaseProductStock(orderProducts);
        alert(`${error_msg}`);

        // addOrder({
        //   merchant_uid: data.merchant_uid,
        //   amount: data.amount,
        //   name: data.name,
        //   status: "received",
        //   products: orderProducts,
        //   orderedAt: +new Date(),
        //   buyer_uid: userId || null,
        //   buyer_name: data.buyer_name,
        //   buyer_tel: data.buyer_tel,
        //   buyer_email: data.buyer_email,
        //   buyer_addr: data.buyer_addr,
        //   buyer_postcode: data.buyer_postcode,
        // });
      }
    });
  }
  return { onClickPayment };
}
