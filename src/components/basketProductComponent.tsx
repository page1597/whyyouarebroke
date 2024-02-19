import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction, memo } from "react";
import QuantityInput from "./quantityInput";

function BasketProductComponent({
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
        <div className="grid grid-flow-col md:grid-cols-5 grid-cols-4 gap-2 text-sm md:text-base">
          <div className="flex justify-center items-center">
            <div>
              <img decoding="async" loading="lazy" src={product.image} width={96} height={96} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            [{product.format}] {product.name}
          </div>
          <div className="flex items-center justify-center">{product.price}원</div>
          <div className="flex justify-center items-center">
            <QuantityInput product={product} basketProducts={basketProducts} setBasketProducts={setBasketProducts} />
          </div>
          <div className="md:flex hidden items-center justify-center">
            {basketProducts.find((basketProduct) => basketProduct.id === product.id)!.quantity * product.price}원
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 grid-cols-4">
          {labels.map((label, index) =>
            label === "합계" ? (
              <div className="hidden md:grid" key={index}>
                {label}
              </div>
            ) : (
              <div key={index}>{label}</div>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default memo(BasketProductComponent);
