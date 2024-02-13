import { fbGetRandomProducts } from "@/services/firebase/product";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

// 추천상품 4개만 보여짐 (number = 4)
export default function useGetRecommandProducts(productId: string, category: string, number: number) {
  const [recommands, setRecommands] = useState<DocumentData[]>(new Array(number));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function getRecommands() {
    try {
      setIsLoading(true);
      const result = await fbGetRandomProducts(productId, category, number);
      setRecommands(result);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getRecommands();
  }, []);

  return { isLoading, recommands };
}
