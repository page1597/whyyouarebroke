import useDebouncedSearch from "@/hooks/product/useDebouncedSearch";
import useGetProducts from "@/hooks/product/useGetProducts";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductType } from "@/types/product";
import { Loader2 } from "lucide-react";

export default function SearchProducts() {
  const navigate = useNavigate();
  const { debouncedSearchValue, onSearch } = useDebouncedSearch();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetProducts(null, debouncedSearchValue);
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="p-6 sm:p-8">
      <Input className="h-10" placeholder="상품을 검색하세요." onChange={onSearch} />
      {!isLoading ? (
        data && debouncedSearchValue ? (
          <div className="flex flex-col mt-4">
            {data.pages.map((page, index) => (
              <div key={index} className="gap-3 flex flex-col">
                {page.map((product: ProductType) => (
                  <div
                    key={product.id}
                    className="flex flex-row text-zinc-800 cursor-pointer"
                    onClick={() => navigate({ pathname: "/product", search: `id=${product.id}` })}
                  >
                    <img alt={product.name} src={product.image} width={96} height={96} />
                    <div className="flex flex-col gap-1 text-sm justify-center ml-4">
                      <div>
                        [{product.format}] {product.name}
                      </div>
                      <div>카테고리: {product.category}</div>
                      <div>가격: {product.price}원</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )
      ) : (
        <div className="w-full justify-center flex p-10">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <div ref={inViewRef} className="h-42 w-screen">
        {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin" />}
      </div>
    </div>
  );
}
