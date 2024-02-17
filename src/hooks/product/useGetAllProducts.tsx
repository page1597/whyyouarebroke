import { useState, useEffect } from "react";
import { categoryProductType } from "@/types/product";
import { fbGetProducts } from "@/services/firebase/product";

function useGetAllProducts() {
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [productList, setProductList] = useState<categoryProductType[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const categories = [
          "rock/pop/etc",
          "hip hop/r&b",
          "jazz",
          "ost",
          "k-pop",
          "j-pop/city pop/asia",
          "merchandise",
        ];
        const productPromises = categories.map((category) =>
          fbGetProducts(category, null, null, "createdAt", null, null)
        );

        const products = await Promise.all(productPromises);

        setProductList(
          categories.map((category: string, index: number) => ({
            category,
            products: products[index],
          }))
        );

        setLoading(false); // 데이터 로딩 완료 후 상태 업데이트
      } catch (error) {
        console.error("상품 목록을 불러오는 중에 오류가 발생했습니다:", error);
        setLoading(false); // 데이터 로딩 중 오류 발생 시 상태 업데이트
      }
    }

    getAllProducts();
  }, []);

  return { loading, productList };
}
export default useGetAllProducts;
