import { fbDeleteProduct } from "@/services/firebase/product";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useDeleteProductMutation() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["delete product"],
    mutationFn: async (productId: string) => await fbDeleteProduct(productId),
    onSuccess: useCallback(() => {
      console.log("상품 삭제 성공");
      alert("상품이 삭제되었습니다.");
      navigate("/");
    }, [navigate]),
    onError: useCallback((error: any) => {
      console.log("상품 삭제 실패", error);
      alert("상품을 삭제하지 못했습니다.");
    }, []),
  });

  return { deleteProduct: mutate };
}
export default useDeleteProductMutation;
