import { fbGetOrders } from "@/services/firebase/order";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { useCallback } from "react";

// useGetProductsWithSearch
function useGetOrders(isAdmin: boolean, userId: string | undefined | null) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
    queryKey: ["orders"],
    // 비회원인 경우? -> 일단 막아놓기
    queryFn: ({ pageParam }) => fbGetOrders(isAdmin, userId, pageParam, 12),
    initialPageParam: null,
    getNextPageParam: (querySnapshot: DocumentData) => {
      if (querySnapshot.length < 12) {
        return null;
      } else {
        return querySnapshot[querySnapshot.length - 1].orderedAt;
      }
    },
  });

  const prefetchNextPage = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await queryClient.prefetchInfiniteQuery({ queryKey: ["orders"], queryFn: fetchNextPage, pages: 3 });
    }
  }, [hasNextPage, isFetchingNextPage, queryClient, fetchNextPage]);

  return { data, status, isFetchingNextPage, prefetchNextPage, refetch };
}
export default useGetOrders;
