import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import _ from "lodash";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import useDebouncedSearch from "@/hooks/product/useDebouncedSearch";
import useGetProducts from "@/hooks/product/useGetProducts";

export default function ProductList({ category }: { category?: string }) {
  const navigate = useNavigate();
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });

  const { debouncedSearchValue, onSearch } = useDebouncedSearch();
  const {
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
  } = useGetProducts(category ?? null, debouncedSearchValue);

  useEffect(() => {
    if (inView) {
      prefetchNextPage();
      console.log("pre-fetch next page");
    }
  }, [inView, orderby]);

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <h3 className="text-2xl text-zinc-900">{category ? category.toUpperCase() : "전체 상품"}</h3>
        <div className="flex gap-3 items-center">
          <button
            name="createdAt"
            value={orderby}
            onClick={() => changeOrderby("createdAt")}
            className={`text-nowrap bg-transparent text-zinc-600 hover:bg-transparent text-sm ${orderby === "createdAt" ? "font-bold" : "font-medium"}`}
          >
            최신순
          </button>
          <Popover>
            <PopoverTrigger
              className="p-0 m-0 h-5 flex"
              name="price"
              value={orderby}
              onClick={() => changeOrderby("price")}
            >
              <span
                className={`bg-transparent text-zinc-600 hover:bg-transparent text-sm text-nowrap ${orderby === "price" ? "font-extrabold" : "font-medium"}`}
              >
                가격순
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3 w-60 text-sm">
              <div className="flex justify-between">
                <div>가격 범위 설정</div>
                <PopoverClose>
                  <X />
                </PopoverClose>
              </div>
              <div className="flex justify-between items-center w-full">
                <Input
                  className="w-20"
                  value={String(minPrice)}
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                원 ~
                <Input
                  className="w-20"
                  value={String(maxPrice)}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
                원
              </div>
              <Button onClick={onSearchByPrice} className="bg-zinc-800 border">
                적용하기
              </Button>
            </PopoverContent>
          </Popover>
          <Input className="hidden md:flex w-52" placeholder="상품을 검색하세요" onChange={onSearch} />
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
                          <div className="text-sm mt-2 h-5 overflow-hidden text-ellipsis">{product["name"]}</div>
                          <div className="text-xs font-bold text-zinc-800">{product["artist"]}</div>

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
