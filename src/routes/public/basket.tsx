import BasketList from "@/components/basketList";
import { getBasket } from "@/services/local/basket";

export default function Basket() {
  const basket = getBasket();
  return (
    <>
      <h3 className="text-xl">장바구니 ({basket ? basket.length : 0})</h3>
      <BasketList basket={basket} />
    </>
  );
}
