import { getProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, QueryClient, useMutation } from "@tanstack/react-query";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(12, pageParam),
    initialPageParam: null,
    getNextPageParam: (querySnapshot) => {
      if (querySnapshot.length < 12) {
        return null;
      }
      return querySnapshot[querySnapshot.length - 1].createdAt;
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  async function prefetchNextPage() {
    console.log("hasNextPage", hasNextPage, "isFetchingNextPage", isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      await queryClient.prefetchInfiniteQuery({ queryKey: ["products"], queryFn: fetchNextPage, pages: 3 });
    }
  }

  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  useEffect(() => {
    if (inView) {
      prefetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <h3 className="text-xl">전체 상품</h3>

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
