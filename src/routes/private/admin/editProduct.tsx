import AddProductForm from "@/components/addProductForm";
import { getProduct } from "@/services/firebase";
import { ProductType } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(true);

  async function getProductInfo(productId: string) {
    try {
      setLoading(true);
      const result = await getProduct(productId);
      setProduct(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productId) {
      getProductInfo(productId);
    }
  }, [productId]);

  return (
    <div>
      <h3 className="text-xl">상품수정</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        {loading ? <p>Loading...</p> : product && <AddProductForm product={product} navigate={navigate} />}
      </div>
    </div>
  );
}
