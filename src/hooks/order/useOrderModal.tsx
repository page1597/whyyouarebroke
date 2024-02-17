import { paymentFormSchema } from "@/types/formSchemas/payment";
import { BasketProductType } from "@/types/product";
import { UserInfoType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useShowAlert from "../useShowAlert";

function useOrderModal(
  userInfo: UserInfoType | null | undefined,
  checkedProducts: BasketProductType[],
  basketProducts: BasketProductType[]
) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState<BasketProductType[]>(checkedProducts);
  const [totalPrice, setTotalPrice] = useState<number>();
  const { showAlert, setShowAlert, alertContent, setAlertContent } = useShowAlert();

  const onOpen = useCallback(
    (orderProducts: BasketProductType[]) => {
      console.log("함수 생성");
      setOrderProducts(orderProducts);
      if (orderProducts.length > 0) {
        console.log(orderProducts);
        setIsOpen(true);
        setTotalPrice(
          orderProducts.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0)
        );
      } else {
        setShowAlert(true);
        setAlertContent({ title: "장바구니", desc: "주문하려는 상품을 선택해 주세요.", nav: null });
        return;
      }
    },
    [orderProducts]
  );

  function orderSelectedProducts() {
    onOpen(checkedProducts);
  }

  function orderAllProducts() {
    setOrderProducts(basketProducts);
    onOpen(basketProducts);
  }

  function onClose() {
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
    onClose,
    orderProducts,
    orderSelectedProducts,
    orderAllProducts,
    totalPrice,
    showAlert,
    setShowAlert,
    alertContent,
  };
}
export default useOrderModal;
