import { fbUpdateProduct } from "@/services/firebase/product";
import { BasketProductType } from "@/types/product";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProductQuantityMutation() {
  const { mutate } = useMutation({
    mutationKey: ["update product"],
    mutationFn: ({ type, DBStock, product }: { type: string; DBStock: number; product: BasketProductType }) =>
      fbUpdateProduct(product.id, type === "add" ? DBStock + product.quantity : DBStock - product.quantity),
    onSuccess: () => {
      // console.log("상품 수량 업데이트 성공");
    },
    onError: () => {
      alert("상품 수량 업데이트에 실패했습니다.");
    },
  });

  return { updateProductQuantity: mutate };
}
