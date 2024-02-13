import { BasketProductType } from "./product";

export type OrderInfoType = {
  merchant_uid: string; // 주문번호
  amount: number;
  name: string;
  // status: string;
  status: typeof OrderStatusType;
  products: BasketProductType[];
  orderedAt: number;
  buyer_uid: string | undefined;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
};

export const OrderStatusType = {
  PURCHASE_CONFIRMED: "구매 확인",
  AWAITING_SHIPMENT: "발송 대기",
  SHIPMENT_STARTED: "발송 시작",
  ORDER_CANCELLED: "주문 취소",
  SALE_COMPLETED: "판매 완료",
};

// export type OrderStatusType = keyof typeof OrderStatus;
