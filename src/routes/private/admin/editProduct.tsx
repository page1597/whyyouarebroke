import AddProductForm from "@/components/addProductForm";
import useGetProduct from "@/hooks/product/useGetProduct";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function EditProduct() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const { isLoading, product } = useGetProduct(productId);

  return (
    <div>
      <h3 className="text-xl">상품수정</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        {!isLoading && product && <AddProductForm product={product} />}
        {isLoading && <Loader2 className="h-10 w-10 animate-spin" />}
      </div>
    </div>
  );
}
