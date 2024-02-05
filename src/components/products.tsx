import { getProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import _ from "lodash";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

export default function Products({ category }: { category: string }) {
  const navigate = useNavigate();
  const [orderby, setOrderby] = useState<string>("createdAt");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState<number>(0);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<number>(500000);

  const debounceDelay = 1000;

  const debouncedSearch = useCallback(
    _.debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, debounceDelay),
    []
  );
  const debouncedMinSearch = useCallback(
    _.debounce((value: number) => {
      setDebouncedMinPrice(value);
    }, debounceDelay),
    []
  );
  const debouncedMaxSearch = useCallback(
    _.debounce((value: number) => {
      setDebouncedMaxPrice(value);
    }, debounceDelay),
    []
  );

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log("on search 실행");
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    debouncedSearch(searchValue);
  }

  // function onSearchWithMinPrice(e: ChangeEvent<HTMLInputElement>) {
  //   const value = e.target.value;
  //   setMinPrice(parseInt(value));
  //   debouncedMinSearch(parseInt(value));
  // }
  // function onSearchWithMaxPrice(e: ChangeEvent<HTMLInputElement>) {
  //   const value = e.target.value;
  //   setMaxPrice(parseInt(value));
  //   debouncedMaxSearch(parseInt(value));
  // }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
    queryKey: ["products", category, orderby, debouncedSearchValue],
    queryFn: ({ pageParam }) => getProducts(category, orderby, null, pageParam, debouncedSearchValue),
    initialPageParam: null,
    getNextPageParam: (querySnapshot: DocumentData) => {
      if (querySnapshot.length < 12) {
        return null;
      } else {
        return querySnapshot[querySnapshot.length - 1].createdAt;
      }
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
    setOrderby(order);
    refetch();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <h3 className="text-2xl text-zinc-900">{category.toUpperCase()}</h3>
        <div className="flex gap-3">
          {/* <Slider
            className="w-52"
            defaultValue={[10000, 500000]}
            max={500000}
            step={1}
            onValueChange={handleSliderChange}
          /> */}
          {/* <Input value={minPrice} type="number" className="w-24" onChange={onSearchWithMinPrice} />
          원 ~
          <Input value={maxPrice} className="w-24" type="number" onChange={onSearchWithMaxPrice} />
          원 */}
          <Input className="hidden md:flex w-52" placeholder="상품을 검색하세요" onChange={onSearch} />
          <button
            name="createdAt"
            value={orderby}
            onClick={() => changeOrderby("createdAt")}
            className={`text-nowrap bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby === "createdAt" ? "font-bold" : "font-medium"}`}
          >
            최신순
          </button>
          <button
            name="price"
            value={orderby}
            onClick={() => changeOrderby("price")}
            className={`text-nowrap bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby === "price" ? "font-extrabold" : "font-medium"}`}
          >
            가격순
          </button>
        </div>
      </div>

      {status === "success" ? (
        <div className="mt-8">
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20">
                  {page.map((product: DocumentData) => (
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer"
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
                        <div>
                          <div className="text-sm mt-2">{product["name"]}</div>
                          <div className="text-sm font-bold text-zinc-500 mt-1">{product["price"]}원</div>
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
      ) : (
        <p>loading...</p>
      )}
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
