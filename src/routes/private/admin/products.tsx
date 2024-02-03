import { getProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import _ from "lodash";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();
  const [orderby, setOrderby] = useState<string>("createdAt");
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const debounceDelay = 1000;

  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, debounceDelay),
    []
  );

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    debouncedSearch(searchValue);
  }

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["products", orderby, debouncedSearchValue],
    queryFn: ({ pageParam }) => getProducts(null, orderby, 12, pageParam, debouncedSearchValue),
    initialPageParam: null,
    getNextPageParam: (querySnapshot) => {
      if (querySnapshot.length < 12) {
        return null;
      }
      return querySnapshot[querySnapshot.length - 1].createdAt;
    },
  });
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 debounce 함수를 클리어
    return () => {
      debouncedSearch.cancel(); // debounce 함수 클리어
    };
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  async function prefetchNextPage() {
    if (hasNextPage && !isFetchingNextPage) {
      await queryClient.prefetchInfiniteQuery({ queryKey: ["products"], queryFn: fetchNextPage, pages: 3 });
    }
  }

  useEffect(() => {
    if (inView) {
      prefetchNextPage();
    }
  }, [inView, orderby]);

  const changeOrderby = (order: string) => {
    console.log(order);
    setOrderby(order);
    refetch();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <h3 className="text-xl">전체 상품</h3>
        <div className="flex gap-3">
          <input className="hidden md:flex" placeholder="상품을 검색하세요" onChange={onSearch} />
          <button
            name="createdAt"
            value={orderby}
            onClick={() => changeOrderby("createdAt")}
            className={`bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby === "createdAt" ? "font-bold" : "font-medium"}`}
          >
            최신순
          </button>
          <button
            name="price"
            value={orderby}
            onClick={() => changeOrderby("price")}
            className={`bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby === "price" ? "font-extrabold" : "font-medium"}`}
          >
            가격순
          </button>
        </div>
      </div>
      <button
        title="상품 등록"
        className="fixed right-10 bottom-10 bg-zinc-200 rounded-full p-2 z-10"
        onClick={() => navigate("/add-product")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555555"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-14 md:h-14"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <div className="mt-8">
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20">
                {page?.map((product: DocumentData) => (
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    key={product.id}
                    onClick={() => navigate({ pathname: "/product", search: `?id=${product.id}` })}
                  >
                    <div>
                      {product.image ? (
                        <div className="relative overflow-hidden">
                          <img
                            src={product["image"][0]}
                            width={60}
                            height={60}
                            className="h-60 w-60 object-contain transition-transform transform-gpu hover:scale-105"
                            alt={product.name}
                          />
                        </div>
                      ) : (
                        <div className="w-60 h-60 bg-zinc-100" />
                      )}
                      <div className="flex flex-col">
                        <div className="text-sm mt-2">{product["name"]}</div>
                        <div className="text-sm mt-1 font-bold text-zinc-500">{product["price"]}원</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>상품이 존재하지 않습니다.</p>
            )}
          </div>
        ))}
      </div>
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
