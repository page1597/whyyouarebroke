import BasketList from "@/components/basketList";
import useBasket from "@/hooks/basket/useBasket";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Basket() {
  const { getBasket } = useBasket();
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const basketData = getBasket();
    setBasket(basketData);
  }, [getBasket]);

  return (
    <>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <h3 className="text-xl">장바구니 ({basket ? basket.length : 0})</h3>
      <BasketList basket={basket} />
    </>
  );
}
