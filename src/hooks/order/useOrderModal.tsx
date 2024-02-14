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
  basketProducts: BasketProductType[]
) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderProducts, setOrderProducts] = useState<BasketProductType[]>(checkedProducts);
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    if (isOpen) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
      };

      const handlePopState = () => {};

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handlePopState);
      };
    }
  });

  // useEffect(() => {
  //   setOrderProducts(checkedProducts);
  // }, [checkedProducts]);

  function orderSelectedProducts() {
    onOpen(checkedProducts);
  }

  function orderAllProducts() {
    setOrderProducts(basketProducts);
    onOpen(basketProducts);
  }

  function onOpen(orderProducts: BasketProductType[]) {
    setOrderProducts(orderProducts);
    if (orderProducts.length > 0) {
      console.log(orderProducts);
      setIsOpen(true);
      setTotalPrice(orderProducts.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0));
    } else {
      alert("주문하려는 상품을 선택해 주세요.");
      return;
    }
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
  };
}
