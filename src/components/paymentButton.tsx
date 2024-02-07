import { BasketProductType } from "@/types";
import { Button } from "./ui/button";
import { FieldValues, UseFormReturn } from "react-hook-form";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function PaymentButton({
  fieldValues,
  checkedProducts,
}: {
  fieldValues: FieldValues;
  checkedProducts: BasketProductType[];
}) {
  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const IMP = window.IMP;
    IMP.init("imp24067853");

    console.log(checkedProducts);
    const buyerInfo = fieldValues;
    let priceAmount = 0;
    checkedProducts.forEach((products) => {
      priceAmount += products.quantity * products.price;
    });
    console.log(priceAmount);

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `${checkedProducts[0].id}_${new Date().getTime()}`, // 주문번호
      amount: priceAmount, // 결제금액
      name: `${checkedProducts[0].name}...`, // 주문명
      buyer_name: buyerInfo.buyer_tel, // 구매자 이름
      buyer_tel: buyerInfo.buyer_tel, // 구매자 전화번호
      buyer_email: buyerInfo.buyer_email, // 구매자 이메일
      buyer_addr: buyerInfo.buyer_addr, // 구매자 주소
      buyer_postcode: buyerInfo.buyer_postcode, // 구매자 우편번호
    };
    console.log(data);

    /* 4. 결제 창 호출하기 */
    // IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: { success: any; merchant_uid: any; error_msg: any }) {
    const { success, merchant_uid, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  return (
    <Button className="bg-zinc-700 hover:bg-zinc-800" onClick={onClickPayment}>
      결제하기
    </Button>
  );
}
