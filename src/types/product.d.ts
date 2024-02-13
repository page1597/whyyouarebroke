export type ProductType = {
  id: string; // 고유 아이디
  category: string;
  name: string;
  price: number;
  stock: number;
  image: any;
  description: string;
  artist: string;
  label: string?;
  released: string?;
  format: string?;
  createdAt: number;
};

export type categoryProductType = {
  category: string;
  products?: DocumentData[];
};

export type BasketProduct = ProductType & {
  quantity: number;
};

// 장바구니 속성 중 description 항목을 제외함
export type BasketProductType = Pick<
  BasketProduct,
  "id" | "name" | "price" | "format" | "stock" | "quantity" | "image"
>;
