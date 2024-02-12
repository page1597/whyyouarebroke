import { BasketProductType } from "@/types";
import { Dispatch, SetStateAction } from "react";
// 전역적으로 (localStorage) 수량이 변함.
function NumberInput({
  product,
  quantity,
  setQuantity,
}: {
  product?: BasketProductType;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) {
  function onPlus() {
    setQuantity(quantity + 1);
  }

  function onMinus() {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  }
  return (
    <div className="flex items-center">
      {/* {product ? <div>{product!.price * quantity}원</div> : <></>} */}
      <button type="button" onClick={onMinus} className="px-2 rounded-l cursor-pointer">
        -
      </button>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="text-sm w-12 h-7 border border-zinc-400 rounded text-center outline-none"
      />
      <button type="button" onClick={onPlus} className="px-2 rounded-r cursor-pointer">
        +
      </button>
    </div>
  );
}

export default NumberInput;
