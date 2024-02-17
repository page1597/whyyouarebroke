import { useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import { fbGetProduct } from "@/services/firebase/product";

function useGetProduct(productId: string | null) {
  const [product, setProduct] = useState<ProductType | undefined>();
  const [loading, setLoading] = useState(true);
  if (productId == null || productId == "") {
    throw Error("해당 상품이 존재하지 않습니다.");
  }
  async function getProductInfo(productId: string) {
    console.log("get product info");
    try {
      setLoading(true);
      const result = await fbGetProduct(productId);
      setProduct(result as ProductType);
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

  return { loading, product };
}
export default useGetProduct;
