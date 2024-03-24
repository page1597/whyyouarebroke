import { BasketProductType } from "./product";

export type OrderType = {
  merchant_uid: string; // 주문번호
  amount: number;
  name: string;
  status: string;
  products: BasketProductType[];
  orderedAt: number;
  buyer_uid: string | null;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
};

export type OrderTypeMobile = {
  merchant_uid: string; // 주문번호
  amount: number;
  name: string;
  status: string;
  products: BasketProductType[];
  orderedAt: number;
  buyer_uid: string | null;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
};

// 한 상품에 대한 타입
export type OrderProductType = {
  merchant_uid: string;
  product: BasketProductType;
  orderedAt: number;
  buyer_addr: string;
  buyer_name: string;
};

export const OrderStatusType = {
  PURCHASE_CONFIRMED: "구매 확인",
  AWAITING_SHIPMENT: "발송 대기",
  SHIPMENT_STARTED: "발송 시작",
  ORDER_CANCELLED: "주문 취소",
  SALE_COMPLETED: "판매 완료",
} as const;

export type OrderStatusType = "구매 확인" | "발송 대기" | "발송 시작" | "주문 취소" | "판매 완료";

// export type OrderStatusType = keyof typeof OrderStatus;
