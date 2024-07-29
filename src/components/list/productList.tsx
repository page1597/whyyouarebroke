import { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import useDebouncedSearch from "@/hooks/product/useDebouncedSearch";
import useGetProducts from "@/hooks/product/useGetProducts";
import { ProductType } from "@/types/product";
import ProductListSkeleton from "../skeleton/productListSkeleton";
import { Loader2 } from "lucide-react";
import useWindowWidth from "@/hooks/useWindowWidth";
import ProductCard from "../detail/productCard";

function ProductList({ category }: { category?: string }) {
  const { width } = useWindowWidth();
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
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetProducts(category ?? null, debouncedSearchValue);

  useEffect(() => {
    // 스크롤이 끝에 도달할 때마다 페이지 증가
    if (inView && orderby) {
      fetchNextPage();
    }
  }, [inView, orderby]);

  return (
    <>
      <div className="flex justify-between items-end">
        <h3 className="md:text-2xl text-lg text-zinc-900">{category ? category.toUpperCase() : "전체 상품"}</h3>
        <div className="flex gap-3 items-center">
          <button
            id="createdAt"
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
              id="price"
              name="price"
              value={orderby}
              onClick={() => changeOrderby("price")}
            >
              <span
                className={`bg-transparent text-zinc-600 hover:bg-transparent text-sm text-nowrap ${orderby === "price" ? "font-extrabold" : "font-medium"}`}
              >
                {width > 640 ? <>가격 낮은 순</> : <>가격낮은순</>}
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3 w-60 text-sm">
              <div className="flex justify-between">
                <span>가격 범위 설정</span>
                <PopoverClose>
                  <X />
                </PopoverClose>
              </div>
              <div className="flex justify-between items-center w-full">
                <Input
                  className="w-20"
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (!isNaN(newValue) && newValue >= 0 && newValue <= 10000000) {
                      setMinPrice(newValue);
                    }
                  }}
                />
                원 ~
                <Input
                  type="number"
                  className="w-20"
                  value={maxPrice}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (!isNaN(newValue) && newValue >= 0 && newValue <= 10000000) {
                      setMaxPrice(newValue);
                    }
                  }}
                />
                원
              </div>
              <Button id="apply" onClick={onSearchByPrice} className="bg-zinc-800 border">
                적용하기
              </Button>
            </PopoverContent>
          </Popover>
          <Input className="hidden sm:flex w-52" placeholder="상품을 검색하세요" onChange={onSearch} />
        </div>
      </div>
      {!isLoading && data ? (
        <div className="mt-8">
          {data.pages.map((page, index) => (
            <div key={index}>
              {page ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 justify-center gap-y-10 gap-x-2">
                  {page.map((product: ProductType) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <p>상품이 존재하지 않습니다.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ProductListSkeleton />
      )}
      <div ref={inViewRef} className="h-42 mt-12 w-full flex justify-center">
        {isFetchingNextPage && <Loader2 className="h-10 w-10 animate-spin" />}
      </div>
    </>
  );
}
export default memo(ProductList);
