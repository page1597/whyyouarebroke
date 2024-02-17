import { fbGetProduct } from "@/services/firebase/product";
// import { updateBasketProductStock } from "@/services/local/basket";
import { BasketProductType } from "@/types/product";
import useUpdateProductQuantityMutation from "../product/useUpdateProductQuantityMutation";
import { useCallback } from "react";
import useBasket from "../basket/useBasket";

function useOrderProcessing(userId: string | null | undefined, orderProducts: BasketProductType[]) {
  const { updateProductQuantity } = useUpdateProductQuantityMutation();
  const { updateBasketProductStock } = useBasket();

  const checkIsOutOfStock = useCallback(async () => {
    try {
      // 모든 상품의 재고를 확인하여 부족한 상품이 있는지 확인
      const results = await Promise.all(
        orderProducts.map(async (product) => {
          const DBProduct = await fbGetProduct(product.id);
          const DBStock = DBProduct?.stock;
          return { isOutOfStock: DBStock - product.quantity < 0, productName: product.name };
        })
      );
      // 결과 배열에서 하나라도 true가 있으면 재고 부족으로 처리
      const outOfStockProducts = results.filter((result) => result.isOutOfStock);
      if (outOfStockProducts.length > 0) {
        const productName = outOfStockProducts.map((product) => product.productName).join(", ");
        alert(`${productName}의 상품 재고가 부족하여 구매가 불가능합니다.`);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("상품 재고 확인 실패:", error);
      return true; // 에러 발생 시 재고 부족으로 처리
    }
  }, [orderProducts]);

  // 실제 결제 진행 전 firebase DB에서 재고수량 미리 감소시키기
  const decreaseProductStock = useCallback(async () => {
    // 2. 모든 제품의 재고가 충분한 경우에만 DB 업데이트 수행
    try {
      await Promise.all(
        orderProducts.map(async (product) => {
          const DBProduct = await fbGetProduct(product.id);
          const DBStock = DBProduct?.stock;
          // DB 수량 변경
          updateProductQuantity({ type: "subtract", DBStock, product });
          // 장바구니 수량도 변경
          updateBasketProductStock(userId == undefined ? null : userId, product, DBStock - product.quantity);
        })
      );
    } catch (e) {
      console.error("상품 재고 업데이트 실패:", e);
    }
  }, [orderProducts]);

  // 상품 재고 늘리기
  const increaseProductStock = useCallback(async () => {
    try {
      await Promise.all(
        orderProducts.map(async (product) => {
          const DBProduct = await fbGetProduct(product.id);
          const DBStock = DBProduct?.stock;

          // 실제 DB 업데이트
          updateProductQuantity({ type: "add", DBStock, product });
          updateBasketProductStock(
            userId == undefined || userId === null ? null : userId,
            product,
            DBStock + product.quantity
          );
        })
      );
    } catch (e) {
      console.error("상품 재고 업데이트 실패:", e);
    }
  }, [orderProducts]);

  return { checkIsOutOfStock, decreaseProductStock, increaseProductStock };
}
export default useOrderProcessing;
