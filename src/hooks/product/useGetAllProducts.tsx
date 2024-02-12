import { useState, useEffect } from "react";
import { categoryProductType } from "@/types/product";
import { fbGetProducts } from "@/services/firebase/product";

export default function useAllProducts() {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [productList, setProductList] = useState<categoryProductType[]>();
  const orderby = "createdAt"; // 정렬 기본값: 최신순

  async function getAllProducts() {
    const categories = ["rock/pop/etc", "hip hop/r&b", "jazz", "ost", "k-pop", "j-pop/city pop/asia", "merchandise"];
    const productPromises = categories.map((category) => fbGetProducts(category, null, null, orderby, null, null));
    const products = await Promise.all(productPromises);

    setProductList(
      categories.map((category: string, index: number) => ({
        category,
        products: products[index],
      }))
    );
    // setIsLoaded(true);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return { productList };
}
