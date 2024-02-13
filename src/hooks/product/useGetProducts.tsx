import { fbGetProducts } from "@/services/firebase/product";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";

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

  function onSearchByPrice() {
    setPriceRange({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
    refetch();
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
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

  async function prefetchNextPage() {
    if (hasNextPage && !isFetchingNextPage) {
      await queryClient.prefetchInfiniteQuery({ queryKey: ["products"], queryFn: fetchNextPage, pages: 3 });
    }
  }
  return {
    data,
    orderby,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    changeOrderby,
    onSearchByPrice,
    status,
    isFetchingNextPage,
    prefetchNextPage,
  };
}
