import { ProductType } from "@/types/product";
import { Dispatch, SetStateAction, memo, useEffect, useMemo } from "react";
// 전역적으로 (localStorage) 수량이 변함.
function NumberInput({
  product,
  quantity,
  setQuantity,
}: {
  product?: ProductType;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) {
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  function onPlus() {
    setQuantity(quantity + 1);
  }

  function onMinus() {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }

  const totalPrice = useMemo(() => {
    return product ? product.price * quantity : 0;
  }, [quantity]);

  return (
    <div className="flex items-center text-nowrap">
      {product ? <div>{totalPrice.toLocaleString()}원</div> : <></>}
      <button id="minus" type="button" onClick={onMinus} className="px-2 rounded-l cursor-pointer">
        -
      </button>
      <input
        type="text"
        value={quantity}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
            setQuantity(newValue);
          }
        }}
        className="text-sm w-12 h-7 border border-zinc-400 rounded text-center outline-none"
      />
      <button id="plus" type="button" onClick={onPlus} className="px-2 rounded-r cursor-pointer">
        +
      </button>
    </div>
  );
}

export default memo(NumberInput);
