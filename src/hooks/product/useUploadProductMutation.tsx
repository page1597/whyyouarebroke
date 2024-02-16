import { fbAddProduct } from "@/services/firebase/product";
import { ProductType } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useUploadProductMutation(isEdit: boolean) {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["upload product"],
    mutationFn: (product: ProductType) => fbAddProduct(product),
    onSuccess: () => {
      console.log("상품 등록 성공");
      alert(isEdit ? "상품 정보가 수정되었습니다." : "상품이 등록되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.log("상품 등록 실패", error);
      alert(isEdit ? "상품을 수정하지 못했습니다." : "상품을 등록하지 못했습니다.");
    },
  });
  return { uploadProduct: mutate, isPending };
}
export default useUploadProductMutation;
