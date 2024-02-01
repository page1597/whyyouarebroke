import { BasketContext } from "@/context/basketContext";
import { BasketProductType } from "@/types";
import { useContext, useEffect, useState } from "react";

function NumberInput({ product }: { product?: BasketProductType }) {
  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }

  const { basket, setBasket } = contextValue;
  const productQuantity = basket?.find((item) => item.id === product?.id)?.quantity || 1;
  const [value, setValue] = useState(productQuantity);

  useEffect(() => {
    setBasket((prevBasket) => {
      if (prevBasket === null) {
        return null; // 이전 상태가 null이면 그대로 반환
      }
      // 이전 상태가 배열이라면, 새로운 배열을 생성하여 quantity 속성을 업데이트
      return prevBasket.map((item: BasketProductType) =>
        item.id == product?.id ? { ...item, quantity: value } : { ...item }
      );
    });
  }, [value]);

  function onPlus() {
    setValue(value + 1);
  }

  function onMinus() {
    setValue(value > 1 ? value - 1 : 1);
  }
  return (
    <div className="flex items-center">
      <div>{product!.price * value}원</div>
      <button type="button" onClick={onMinus} className="px-2 rounded-l cursor-pointer">
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="text-sm w-12 h-7 border border-zinc-400 rounded text-center outline-none"
      />
      <button type="button" onClick={onPlus} className="px-2 rounded-r cursor-pointer">
        +
      </button>
    </div>
  );
}

export default NumberInput;
