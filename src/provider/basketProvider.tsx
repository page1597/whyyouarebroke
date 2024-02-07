import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { BasketProductType } from "@/types";
import { BasketContext } from "@/context/basketContext";

export type BasketContextProps = {
  basket: BasketProductType[];
  setBasket: Dispatch<SetStateAction<BasketProductType[]>>;
};

function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketProductType[]>(() => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  const contextValue: BasketContextProps = {
    basket,
    setBasket,
  };
  // localStorage에 저장 -> 새로고침 시에도 유지
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket?.map((item) => convertTypeForStorage(item)) ?? []));
  }, [basket]);

  function convertTypeForStorage(product: BasketProductType): BasketProductType {
    const converted: BasketProductType = {
      id: product.id,
      name: product.name,
      format: product.format,
      price: product.price,
      stock: product.stock,
      image: product.image,
      quantity: product.quantity,
    };
    return converted;
  }

  return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>;
}

export default BasketProvider;
