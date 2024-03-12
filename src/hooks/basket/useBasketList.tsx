import { BasketProductType } from "@/types/product";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useCallback, useEffect, useMemo, useState } from "react";

// 장바구니 checkbox
export default function useBasketList(basket: BasketProductType[] | null) {
  const [basketProducts, setBasketProducts] = useState<BasketProductType[]>([]); // 수량 변경 반영
  const [basketWithTitle, setBasketWithTitle] = useState<BasketProductType[]>([]); // 제목을 위한
  const [checkedProductIds, setCheckedProductIds] = useState<string[]>([]); // id 배열
  const [checkedProducts, setCheckedProducts] = useState<BasketProductType[]>([]); // 진짜로 결제하려고 선택한 애들

  // basket이 null이 아닌 경우에만 상태를 업데이트하도록 처리
  useEffect(() => {
    if (basket !== null) {
      setBasketProducts(basket);

      const withTitle = [{ image: null, name: "", price: -1, quantity: -1, id: "", format: null, stock: 0 }, ...basket];
      setBasketWithTitle(withTitle);
    }
  }, [basket]); // basket이 변경될 때마다 호출

  // 상품 수량이 변경될 때나, 상품 체크/해제가 되었을 때 CheckedProducts 업데이트
  useEffect(() => {
    const checkedProductList = basketProducts.filter((product) => checkedProductIds.includes(product.id));
    setCheckedProducts(checkedProductList);
  }, [checkedProductIds, basketProducts]);

  const onCheck = useCallback(
    (newProductId: string, checked: CheckedState) => {
      setCheckedProductIds((prevIds) => {
        if (newProductId === "") {
          return checked ? basketProducts.map((product) => product.id) : [];
        } else {
          return checked ? [...prevIds, newProductId] : prevIds.filter((id) => id !== newProductId);
        }
      });
    },
    [basketProducts]
  );

  // 선택된 상품들의 총 가격 계산
  const totalPrice = useMemo(() => {
    return checkedProducts.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
  }, [checkedProducts]);

  return {
    basketWithTitle,
    checkedProductIds,
    checkedProducts,
    totalPrice,
    onCheck,
  };
}
