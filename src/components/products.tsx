import { getCategoryProducts } from "@/services/firebase";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Products({ category }: { category: string }) {
  const navigate = useNavigate();
  const [orderby, setOrderby] = useState<string>("createdAt");
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
    queryKey: ["products", category, orderby],
    queryFn: ({ pageParam }) => getCategoryProducts(category, orderby, null, pageParam),
    initialPageParam: null,
    getNextPageParam: (querySnapshot: DocumentData) => {
      if (querySnapshot.length < 12) {
        return null;
      } else {
        return querySnapshot[querySnapshot.length - 1].createdAt;
      }
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

      {status === "success" ? (
        <div className="mt-8">
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20">
                  {page.map((value: DocumentData) => (
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer"
                      key={value.id} // navigate("/product", { state: { scroll: "top", product }
                      onClick={() => navigate("/product", { state: value as DocumentData })}
                    >
                      <div>
                        {value.image ? (
                          <div className="relative overflow-hidden">
                            <img
                              src={value["image"][0]}
                              width={60}
                              height={60}
                              className="h-60 w-60 object-contain transition-transform transform-gpu hover:scale-105"
                              alt={value.name}
                            />
                          </div>
                        ) : (
                          <div className="w-60 h-60 bg-zinc-100" />
                        )}
                        <div>
                          <div className="text-sm mt-2">{value["name"]}</div>
                          <div className="text-sm font-bold text-zinc-500 mt-1">{value["price"]}원</div>
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
