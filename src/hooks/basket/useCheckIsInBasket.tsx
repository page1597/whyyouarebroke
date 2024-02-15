import { hasSameQuantityInBasket } from "@/services/local/basket";
import { useEffect, useState } from "react";

export default function useCheckIsInBasket(productId: string | null) {
  const [isAdded, setIsAdded] = useState(false); // 장바구니에 추가된 상품인지 여부
  const [quantity, setQuantity] = useState(1); // quantity (수량)

  // 해당 상품이 장바구니 안에 들어있는지 확인
  useEffect(() => {
    const checkIsInBasket = async () => {
      if (productId) {
        const isIn = await hasSameQuantityInBasket(productId, quantity);
        setIsAdded(isIn);
      }
    };
    checkIsInBasket();
  }, [productId]);

  useEffect(() => {
    setIsAdded(false);
  }, [quantity]);

  return { isAdded, setIsAdded, quantity, setQuantity };
}
