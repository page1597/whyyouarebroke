import { useEffect, useState } from "react";

function useCheckIsInBasket(productId: string | null) {
  const [isAdded, setIsAdded] = useState(false); // 장바구니에 추가된 상품인지 여부
  const [quantity, setQuantity] = useState(1); // quantity (수량)

  // 해당 상품이 장바구니 안에 들어있는지 확인
  useEffect(() => {
    if (!productId) return; // productId가 null이면 불필요한 호출을 방지

    const getBasket = sessionStorage.getItem("basket");
    if (!getBasket) return; // 장바구니가 비어있으면 불필요한 호출을 방지

    const basket = JSON.parse(getBasket);
    const existingProduct = basket.find((item: { id: string; quantity: number }) => item.id === productId);

    if (existingProduct && existingProduct.quantity === quantity) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [productId, quantity]);

  return { isAdded, setIsAdded, quantity, setQuantity };
}
export default useCheckIsInBasket;
