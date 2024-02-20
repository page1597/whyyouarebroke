import BasketList from "@/components/basketList";
import useBasket from "@/hooks/basket/useBasket";
import { Helmet } from "react-helmet";

export default function Basket() {
  const { getBasket } = useBasket();
  const basket = getBasket();

  return (
    <>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">장바구니 ({basket ? basket.length : 0})</h3>
      <BasketList basket={basket} />
    </>
  );
}
