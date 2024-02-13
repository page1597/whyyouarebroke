import { fbDeleteProduct } from "@/services/firebase/product";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useDeleteProductMutation() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["delete product"],
    mutationFn: async (productId: string) => await fbDeleteProduct(productId),
    onSuccess: () => {
      console.log("상품 삭제 성공");
      alert("상품이 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.log("상품 삭제 실패", error);
      alert("상품을 삭제하지 못했습니다.");
    },
  });

  return { deleteProduct: mutate };
}
