import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { BasketProductForStorage, BasketProductType } from "@/types";
import { BasketContext } from "@/context/basketContext";

export type BasketContextProps = {
  basket: BasketProductType[] | null;
  setBasket: Dispatch<SetStateAction<BasketProductType[] | null>>;
};

function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketProductType[] | null>(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : null;
  });

  const contextValue: BasketContextProps = {
    basket,
    setBasket,
  };
  // localStorage에 저장 -> 새로고침 시에도 유지
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket?.map((item) => convertTypeForStorage(item)) ?? []));
  }, [basket]);

  function convertTypeForStorage(product: BasketProductType): BasketProductForStorage {
    const converted: BasketProductForStorage = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    };
    return converted;
  }

  return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
}

export default BasketProvider;
