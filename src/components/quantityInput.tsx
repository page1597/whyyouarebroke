import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction, memo } from "react";

function QuantityInput({
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
      <button id="minus" type="button" onClick={onMinus} className="px-2 rounded-l cursor-pointer">
        -
      </button>
      {/* const newValue = Number(e.target.value);
          if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
            setQuantity(newValue);
          } */}
      <input
        type="text"
        value={basketProducts.find((basketProducts) => basketProducts.id === product.id)?.quantity}
        onChange={(e) => {
          let quantity = 1;
          let newValue = Number(e.target.value);
          if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
            quantity = newValue;
          }
          const updateProduct = basketProducts.map((basketProduct) => {
            if (basketProduct.id === product.id) {
              return { ...basketProduct, quantity: quantity };
            }
            return basketProduct;
          });
          setBasketProducts(updateProduct);
        }}
        className="text-sm w-6 lg:w-12 sm:w-8 h-7 border border-zinc-400 rounded text-center outline-none"
      />
      <button id="plus" type="button" onClick={onPlus} className="px-2 rounded-r cursor-pointer">
        +
      </button>
    </>
  );
}
export default memo(QuantityInput);
