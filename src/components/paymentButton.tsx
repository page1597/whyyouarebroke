import { BasketProductType, OrderInfoType } from "@/types";
import { Button } from "./ui/button";
import { FieldValues } from "react-hook-form";
import { addOrder } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function PaymentButton({
  fieldValues,
  orderProducts,
  isAgreedTerm,
  userId,
}: {
  fieldValues: FieldValues;
  orderProducts: BasketProductType[];
  isAgreedTerm: boolean;
  userId?: string | null;
}) {
  function onClickPayment() {
    if (!isAgreedTerm) {
      alert("쇼핑몰 이용약관을 동의해주세요.");
      console.log(orderProducts);
      return;
    }
    /* 1. 가맹점 식별하기 */
    const IMP = window.IMP;
    IMP.init("imp24067853");

    console.log(orderProducts);
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
      merchant_uid: `${orderProducts[0].id}_${new Date().getTime()}`, // 주문번호
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
    IMP.request_pay(data, (response: { success: any; merchant_uid: any; error_msg: any }) => {
      const { success, merchant_uid, error_msg } = response;
      console.log(success, merchant_uid);
      if (success) {
        alert("결제 성공");
        mutate({
          merchant_uid: data.merchant_uid,
          status: "received",
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
        alert(`결제 실패: ${error_msg}`);
        mutate({
          merchant_uid: data.merchant_uid,
          amount: data.amount,
          name: data.name,
          status: "received",
          products: orderProducts,
          orderedAt: +new Date(),
          buyer_uid: userId || null,
          buyer_name: data.buyer_name,
          buyer_tel: data.buyer_tel,
          buyer_email: data.buyer_email,
          buyer_addr: data.buyer_addr,
          buyer_postcode: data.buyer_postcode,
        });
      }
    });
  }

  const { mutate } = useMutation({
    mutationKey: ["add order"],
    mutationFn: (order: OrderInfoType) => addOrder(order),
    onSuccess: () => {
      console.log("주문 성공");
      // navigate("/");
    },
    onError: (error) => {
      console.log("주문 실패", error);
    },
  });

  return (
    <Button className="bg-zinc-700 hover:bg-zinc-800" onClick={onClickPayment}>
      결제하기
    </Button>
  );
}
