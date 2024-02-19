import { fbDeleteProduct } from "@/services/firebase/product";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useShowAlert from "../useShowAlert";

export default function useDeleteProductMutation() {
  const navigate = useNavigate();
  const { setAlertContent, setShowAlert, showAlert, alertContent } = useShowAlert();

  const { mutate } = useMutation({
    mutationKey: ["delete product"],
    mutationFn: async (productId: string) => await fbDeleteProduct(productId),
    onSuccess: useCallback(() => {
      setShowAlert(true);
      setAlertContent({ title: "상품 삭제", desc: "상품이 삭제되었습니다.", nav: "/" });
    }, [navigate]),
    onError: useCallback(() => {
      setAlertContent({ title: "상품 삭제", desc: "상품을 삭제하지 못했습니다.", nav: null });
      setShowAlert(true);
    }, []),
  });

  return {
    deleteProduct: mutate,
    mutateAlertContent: alertContent,
    setMutateShowAlert: setShowAlert,
    mutateShowAlert: showAlert,
  };
}
