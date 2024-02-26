import { fbGetProducts } from "@/services/firebase/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { useCallback, useState } from "react";

// useGetProductsWithSearch
export default function useGetProducts(category: string | null, debouncedSearchValue: string) {
  const [orderby, setOrderby] = useState<string>("createdAt");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 500000,
  });

  function changeOrderby(order: string) {
    setOrderby(order);

    refetch();
  }

  const onSearchByPrice = useCallback(() => {
    setPriceRange({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });

    refetch();
  }, [minPrice, maxPrice]);

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 1000, //
  //     },
  //   },
  // });

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    // hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", category, orderby, JSON.stringify(priceRange), debouncedSearchValue],
    queryFn: ({ pageParam }) =>
      fbGetProducts(
        category ? category : null,
        debouncedSearchValue,
        orderby !== "createdAt" ? priceRange : null,
        orderby,
        pageParam,
        12
      ),
    initialPageParam: null,
    getNextPageParam: (querySnapshot: DocumentData) => {
      if (querySnapshot.length < 12) {
        return null;
      } else {
        if (orderby === "createdAt") {
          return querySnapshot[querySnapshot.length - 1].createdAt;
        } else if (orderby === "price") {
          return querySnapshot[querySnapshot.length - 1].price;
        }
      }
    },
  });

  // const prefetchNextPage = useCallback(async () => {
  //   // if (hasNextPage && !isFetchingNextPage) {
  //   // 데이터 프리패칭?????????????????????????????????
  //   //?????????????????????????????????????
  //   await queryClient.prefetchInfiniteQuery({
  //     queryKey: ["products", category, orderby, JSON.stringify(priceRange), debouncedSearchValue],
  //     queryFn: ({ pageParam }) =>
  //       fbGetProducts(
  //         category ? category : null,
  //         debouncedSearchValue,
  //         orderby !== "createdAt" ? priceRange : null,
  //         orderby,
  //         pageParam,
  //         12
  //       ),
  //     initialPageParam: null,
  //     getNextPageParam: (querySnapshot: DocumentData) => {
  //       if (querySnapshot.length < 12) {
  //         return null;
  //       } else {
  //         if (orderby === "createdAt") {
  //           return querySnapshot[querySnapshot.length - 1].createdAt;
  //         } else if (orderby === "price") {
  //           return querySnapshot[querySnapshot.length - 1].price;
  //         }
  //       }
  //     },
  //     pages: 2,
  //   });
  //   // }
  // }, [hasNextPage, isFetchingNextPage, queryClient, fetchNextPage]);

  return {
    data,
    orderby,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    changeOrderby,
    onSearchByPrice,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    // prefetchNextPage,
  };
}
