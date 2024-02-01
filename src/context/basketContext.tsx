import { createContext } from "react";
import { BasketContextProps } from "@/provider/basketProvider";

export const BasketContext = createContext<BasketContextProps | undefined>({
  basket: null,
  setBasket: () => {},
});
