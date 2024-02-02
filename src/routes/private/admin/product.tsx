import ProductInfo from "@/components/productInfo";
import { Button } from "@/components/ui/button";
import { deleteProduct, getProduct } from "@/services/firebase";
import { ProductType } from "@/types";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  // const { state }: DocumentData = useLocation();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  console.log(productId);
  const [product, setProduct] = useState<ProductType>();

  async function getProductInfo(productId: string) {
    const result = await getProduct(productId);
    setProduct(result);
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (productId) {
      getProductInfo(productId);
    }
  }, []);

  return (
    <div className="flex flex-col">
      {product ? (
        <>
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
            <Button
              className="bg-zinc-400 w-28 hover:bg-zinc-500"
              onClick={() => navigate({ pathname: "/edit-product", search: `?id=${product.id}` })}
            >
              상품 정보 수정
            </Button>
          </div>
        </>
      ) : (
        <>상품이 존재하지 않습니다.</>
      )}
    </div>
  );
}
