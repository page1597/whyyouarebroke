import { fbAddProduct } from "@/services/firebase/product";
import { ProductType } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import useShowAlert from "../useShowAlert";

export default function useUploadProductMutation(isEdit: boolean) {
  const { setShowAlert, showAlert, setAlertContent, alertContent } = useShowAlert();
  const { mutate, isPending } = useMutation({
    mutationKey: ["upload product"],
    mutationFn: (product: ProductType) => fbAddProduct(product),
    onSuccess: () => {
      // alert(isEdit ? "상품 정보가 수정되었습니다." : "상품이 등록되었습니다.");
      setShowAlert(true);
      setAlertContent({
        title: "상품 등록",
        desc: isEdit ? "상품 정보가 수정되었습니다." : "상품이 등록되었습니다.",
        nav: "/",
      });
    },
    onError: () => {
      // alert(isEdit ? "상품을 수정하지 못했습니다." : "상품을 등록하지 못했습니다.");
      setShowAlert(true);
      setAlertContent({
        title: "상품 등록",
        desc: isEdit ? "상품을 수정하지 못했습니다." : "상품을 등록하지 못했습니다.",
        nav: null,
      });
    },
  });
  return {
    uploadProduct: mutate,
    isPending,
    mutationShowAlert: showAlert,
    setMutationShowAlert: setShowAlert,
    mutationAlertContent: alertContent,
  };
}
