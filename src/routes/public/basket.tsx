import BasketList from "@/components/basketList";
import { getBasket } from "@/services/basket";

export default function Basket() {
  const basket = getBasket();
  console.log("basket: ", basket);
  return (
    <h3 className="text-xl">
      장바구니 ({basket ? basket.length : 0})<BasketList basket={basket} />
    </h3>
  );
}
