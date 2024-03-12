import BasketList from "@/components/list/basketList";
import { Helmet } from "react-helmet";
import { useBasketContext } from "..";

export default function Basket() {
  const { basketContext } = useBasketContext();

  return (
    <>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">장바구니 ({basketContext ? basketContext.length : 0})</h3>
      <BasketList />
    </>
  );
}
