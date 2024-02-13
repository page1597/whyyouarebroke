export type OrderInfoType = {
  merchant_uid: string; // 주문번호
  amount: number;
  name: string;
  status: string;
  products: BasketProductType[];
  orderedAt: number;
  buyer_uid: string?;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
};
