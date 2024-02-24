import { fbGetRandomProducts } from "@/services/firebase/product";
import { useQuery } from "@tanstack/react-query";
// 추천상품 4개만 보여짐 (number = 4)
export default function useGetRecommandProducts(productId: string, category: string, limit: number) {
  // const [recommands, setRecommands] = useState<DocumentData[]>(new Array(limit));
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const getRecommands = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     const result = await fbGetRandomProducts(productId, category, limit);
  //     setRecommands(result);
  //   } catch (error) {
  //     console.error("추천 상품 가져오기 오류:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [productId]);

  // useEffect(() => {
  //   getRecommands();
  // }, [productId]);
  const { data, isLoading } = useQuery({
    queryKey: ["recommands", productId],
    queryFn: () => fbGetRandomProducts(productId, category, limit),
  });

  return { recommands: data, isLoading };
}
