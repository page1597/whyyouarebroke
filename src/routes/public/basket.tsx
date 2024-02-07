import BasketList from "@/components/basketList";
import { BasketContext } from "@/context/basketContext";
import { useContext } from "react";

export default function Basket() {
  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }
  const { basket } = contextValue;
  return (
    <h3 className="text-xl">
      장바구니 ({basket ? basket.length : 0})
      <BasketList basket={basket} />
    </h3>
  );
}
