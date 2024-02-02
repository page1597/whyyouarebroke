import ProductInfo from "@/components/productInfo";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/firebase";
import { ProductType } from "@/types";
import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const { state }: DocumentData = useLocation();

  const product = state as ProductType;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state]);

  return (
    <div className="flex flex-col">
      <ProductInfo product={product} isAdmin={true} />
      <div className="w-full right-0 flex justify-end items-center gap-3 mt-5">
        <Button
          onClick={async () => {
            await deleteProduct(product.id);
            alert("상품이 삭제되었습니다.");
            navigate("/");
          }}
          className="bg-zinc-500 w-28 hover:bg-zinc-600"
        >
          상품 삭제
        </Button>
        <Button className="bg-zinc-400 w-28 hover:bg-zinc-500" onClick={() => navigate("/edit-product", { state })}>
          상품 정보 수정
        </Button>
      </div>
    </div>
  );
}
