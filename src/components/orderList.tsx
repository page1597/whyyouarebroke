import { AuthContext } from "@/context/authContext";
import { getOrders } from "@/services/firebase";
import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function OrderList() {
  // 이건 페이지네이션으로 구현해볼까
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  const userInfo = useContext(AuthContext);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
    queryKey: ["orders"],
    // 비회원인 경우? -> 일단 막아놓기
    queryFn: ({ pageParam }) => getOrders(userInfo?.id, pageParam, 12),
    initialPageParam: null,
    getNextPageParam: (querySnapshot: DocumentData) => {
      if (querySnapshot.length < 12) {
        return null;
      } else {
        return querySnapshot[querySnapshot.length - 1].orderedAt;
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

  useEffect(() => {
    if (inView) {
      prefetchNextPage();
    }
  }, [inView]);

  async function prefetchNextPage() {
    if (hasNextPage && !isFetchingNextPage) {
      console.log("hasNextPage", hasNextPage, "isFetchingNextPage", isFetchingNextPage);
      await queryClient.prefetchInfiniteQuery({ queryKey: ["products"], queryFn: fetchNextPage, pages: 3 });
    }
  }

  return (
    <div>
      {status === "success" ? (
        <div className="mt-8">
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-20">
                  {page.map((order: DocumentData) => (
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer"
                      key={order.merchant_uid}
                      //   onClick={() => navigate({ pathname: "/product", search: `?id=${product.id}` })}
                    >
                      {order.name}
                      {/* <div>
                        {order.image ? (
                          <div className="relative overflow-hidden">
                            <img
                              src={order["image"][0]}
                              width={60}
                              height={60}
                              className="h-60 w-60 object-contain transition-transform transform-gpu hover:scale-105"
                              alt={order.name}
                            />
                          </div>
                        ) : (
                          <div className="w-60 h-60 bg-zinc-100" />
                        )}
                      </div> */}
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
    </div>
  );
}
