import { fbGetRandomProducts } from "@/services/firebase/product";
import { useQuery } from "@tanstack/react-query";
// 추천상품 4개만 보여짐 (number = 4)
export default function useGetRecommendProducts(productId: string, category: string, limit: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["recommends", productId],
    queryFn: () => fbGetRandomProducts(productId, category, limit),
  });

  return { recommends: data, isLoading };
}
