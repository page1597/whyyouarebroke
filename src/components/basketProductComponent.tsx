import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction } from "react";
import QuantityInput from "./quantityInput";

export default function BasketProductComponent({
  product,
  labels,
  basketProducts,
  setBasketProducts,
}: {
  product: BasketProductType;
  labels: string[];
  basketProducts: BasketProductType[];
  setBasketProducts: Dispatch<SetStateAction<BasketProductType[]>>;
}) {
  return (
    <div key={product.id} className="w-full grid text-center items-center">
      {product.id !== "" ? (
        <div className="grid grid-flow-col grid-cols-5 gap-2">
          <div className="flex justify-center">
            <img src={product.image} width={96} height={96} />
          </div>
          <div className="flex items-center justify-center">
            [{product.format}] {product.name}
          </div>
          <div className="flex items-center justify-center">{product.price}원</div>
          <div className="flex justify-center items-center">
            <QuantityInput product={product} basketProducts={basketProducts} setBasketProducts={setBasketProducts} />
          </div>
          <div className="flex items-center justify-center">
            {basketProducts.find((basketProduct) => basketProduct.id === product.id)!.quantity * product.price}원
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5">
          {labels.map((label) => (
            <div>{label}</div>
          ))}
        </div>
      )}
    </div>
  );
}
