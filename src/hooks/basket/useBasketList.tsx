import { BasketProductType } from "@/types/product";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";

// 장바구니 with check
export default function useBasketList(basket: BasketProductType[] | null) {
  const [basketProducts, setBasketProducts] = useState<BasketProductType[]>([]); // 수량 변경 반영
  const [basketWithTitle, setBasketWithTitle] = useState<BasketProductType[]>([]); // 제목을 위한

  const [checkedProductIds, setCheckedProductIds] = useState<string[]>([]); // id 배열
  const [checkedProducts, setCheckedProducts] = useState<BasketProductType[]>([]); // 진짜로 결제하려고 선택한 애들

  useEffect(() => {
    // basket이 null이 아닌 경우에만 상태를 업데이트하도록 처리
    if (basket !== null) {
      setBasketProducts(basket);

      const withTitle = [{ image: null, name: "", price: -1, quantity: -1, id: "", format: null, stock: 0 }, ...basket];
      setBasketWithTitle(withTitle);
    }
  }, [basket]); // basket이 변경될 때마다 호출

  useEffect(() => {
    // 상품 수량이 변경될 때나, 상품 체크/해제가 되었을 때 CheckedProducts 업데이트
    let checkedProductList: BasketProductType[] = [];
    checkedProductIds.forEach((id) => {
      const product = basketProducts.find((item) => item.id == id);
      if (product) {
        checkedProductList.push(product);
      }
    });
    setCheckedProducts(checkedProductList);
  }, [checkedProductIds, basketProducts]);

  // 장바구니 상태관리가 이상함.. 정리하기
  function onCheck(newProductId: string, checked: CheckedState) {
    if (newProductId === "") {
      if (checked) {
        let allProductsIdList: string[] = [];
        basketProducts.map((product) => {
          allProductsIdList.push(product.id);
        });
        setCheckedProductIds(allProductsIdList);
      } else {
        setCheckedProductIds([]);
      }
    } else {
      if (checked) {
        // 체크한 상품의 아이디를 CheckedProductIds에 담음
        setCheckedProductIds((prevCheckedProductIds) => [...prevCheckedProductIds, newProductId]);
      } else {
        // 체크 해체한 상품의 아이디를 CheckedProductIds에서 제거
        setCheckedProductIds((prevCheckedProductIds) => prevCheckedProductIds.filter((id) => id !== newProductId));
      }
    }
  }
  return {
    basketProducts,
    setBasketProducts,
    basketWithTitle,
    checkedProductIds,
    checkedProducts,
    totalPrice: getTotalPrice(checkedProducts),
    onCheck,
  };
}
// 선택된 상품들의 총 가격 계산
function getTotalPrice(products: BasketProductType[]): number {
  return products.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
}
