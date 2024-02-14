import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction } from "react";

export default function QuantityInput({
  product,
  basketProducts,
  setBasketProducts,
}: {
  product: BasketProductType;
  basketProducts: BasketProductType[];
  setBasketProducts: Dispatch<SetStateAction<BasketProductType[]>>;
}) {
  function onPlus() {
    const updateProduct = basketProducts.map((basketProduct) => {
      if (basketProduct.id === product.id) {
        return { ...basketProduct, quantity: basketProduct.quantity + 1 };
      }
      return basketProduct;
    });
    setBasketProducts(updateProduct);
  }

  function onMinus() {
    const updateProduct = basketProducts.map((basketProduct) => {
      if (basketProduct.id === product.id) {
        if (basketProduct.quantity > 1) {
          return { ...basketProduct, quantity: basketProduct.quantity - 1 };
        }
      }
      return basketProduct;
    });
    setBasketProducts(updateProduct);
  }
  return (
    <>
      <button type="button" onClick={onMinus} className="px-2 rounded-l cursor-pointer">
        -
      </button>
      <input
        type="text"
        value={basketProducts.find((basketProducts) => basketProducts.id === product.id)?.quantity}
        onChange={(e) => {
          const updateProduct = basketProducts.map((basketProduct) => {
            if (basketProduct.id === product.id) {
              return { ...basketProduct, quantity: Number(e.target.value) };
            }
            return basketProduct;
          });
          setBasketProducts(updateProduct);
        }}
        className="text-sm w-12 h-7 border border-zinc-400 rounded text-center outline-none"
      />
      <button type="button" onClick={onPlus} className="px-2 rounded-r cursor-pointer">
        +
      </button>
    </>
  );
}
