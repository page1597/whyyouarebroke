import { fbGetProduct } from "@/services/firebase/product";
import { updateBasketProductStock } from "@/services/local/basket";
import { paymentFormSchema } from "@/types/formSchemas/payment";
import { BasketProductType } from "@/types/product";
import { UserInfoType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useOrderModal(
  userInfo: UserInfoType,
  checkedProducts: BasketProductType[],
  basketProducts: BasketProductType[],
  updateProductQuantity: any // what type
) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState<BasketProductType[]>(checkedProducts);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [isAllButton, setIsAllButton] = useState(false);

  useEffect(() => {
    setOrderProducts(checkedProducts);
  }, [checkedProducts]);

  function orderSelectedProducts() {
    setIsAllButton(false);
    preprocessOrder(orderProducts);
  }

  function orderAllProducts() {
    setIsAllButton(true);
    setOrderProducts(basketProducts);
    preprocessOrder(basketProducts);
  }

  // 실제 결제 진행 전 firebase DB에서 재고수량 미리 감소시키기
  async function preprocessOrder(orderProducts: BasketProductType[]) {
    if (orderProducts.length > 0) {
      // 1. 재고가 부족한 상품이 있는지 확인
      let isOutOfStock = false;
      for (const product of orderProducts) {
        const DBProduct = await fbGetProduct(product.id);
        const DBStock = DBProduct?.stock;

        if (DBStock - product.quantity < 0) {
          alert(`${product.name}의 상품 재고가 부족하여 구매가 불가능합니다.`);
          isOutOfStock = true;
          return;
        }
      }
      // 2. 모든 제품의 재고가 충분한 경우에만 DB 업데이트 수행
      if (!isOutOfStock) {
        for (const product of orderProducts) {
          try {
            const DBProduct = await fbGetProduct(product.id);
            const DBStock = DBProduct?.stock;
            // DB 수량 변경
            updateProductQuantity({ type: "subtract", DBStock, product });
            // 장바구니 수량도 변경
            updateBasketProductStock(
              userInfo.id == undefined ? null : userInfo.id,
              product,
              DBStock - product.quantity
            );
          } catch (e) {
            console.error("상품 재고 업데이트 실패:", e);
            return product;
          }
        }
        setIsOpen(true);
        setTotalPrice(
          orderProducts.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0)
        );
      }
    } else {
      alert("주문하려는 상품을 선택해 주세요.");
      return;
    }
  }

  // 수정 필요. 함수 이름 변경 필요.
  async function closeModal() {
    // alert("주문을 취소하시겠습니까?")
    // orderProducts는 항상 크기가 1이상이고, 재고가 부족한 경우가 없다.
    let orderProductList: BasketProductType[] = orderProducts;
    if (isAllButton) {
      orderProductList = basketProducts;
    }
    for (const product of orderProductList) {
      try {
        const DBProduct = await fbGetProduct(product.id);
        const DBStock = DBProduct?.stock;

        // 실제 DB 업데이트
        updateProductQuantity({ type: "add", DBStock, product });
        updateBasketProductStock(
          userInfo.id == undefined || userInfo.id === null ? null : userInfo.id,
          product,
          DBStock + product.quantity
        );
      } catch (e) {
        console.error("상품 재고 업데이트 실패:", e);
        return product;
      }
    }
    setIsOpen(false);
  }

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      buyer_name: userInfo?.name || "",
      buyer_addr: "",
      buyer_tel: "",
      buyer_email: userInfo?.email || "",
      buyer_postcode: "",
    },
  });

  return {
    form,
    isOpen,
    orderProducts,
    orderSelectedProducts,
    orderAllProducts,
    totalPrice,
    closeModal,
  };
}
