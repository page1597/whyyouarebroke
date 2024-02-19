import { fbGetRandomProducts } from "@/services/firebase/product";
import { DocumentData } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

// 추천상품 4개만 보여짐 (number = 4)
export default function useGetRecommandProducts(productId: string, category: string, limit: number) {
  const [recommands, setRecommands] = useState<DocumentData[]>(new Array(limit));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getRecommands = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fbGetRandomProducts(productId, category, limit);
      setRecommands(result);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getRecommands();
  }, [productId]);

  return { isLoading, recommands };
}
