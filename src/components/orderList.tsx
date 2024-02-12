import { AuthContext } from "@/context/authContext";
import { getOrders, updateOrder } from "@/services/firebase";
import { useInfiniteQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";

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

  const { mutate } = useMutation({
    mutationKey: ["cancelled order"],
    mutationFn: (orderId: string) => updateOrder(orderId, "cancelled"),
    onSuccess: () => {
      console.log("주문 취소 성공");
      alert("주문이 취소되었습니다.");
      refetch();
    },
    onError: (error) => {
      console.log("주문 취소 실패", error);
    },
  });

  function onCancelled(orderId: string) {
    var confirmation = confirm("주문을 취소하시겠습니까?");

    if (confirmation) {
      mutate(orderId);
    }
  }

  return (
    <div>
      {status === "success" ? (
        <div className="mt-8">
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page ? (
                <div className="flex flex-col gap-3">
                  {page.map((order: DocumentData) => (
                    <div
                      className="flex flex-col cursor-pointer"
                      key={order.merchant_uid}
                      //   onClick={() => navigate({ pathname: "/product", search: `?id=${product.id}` })}
                    >
                      {/* {order.name}
                      주문 상태: {order.status} */}
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-col">
                          <div>id: {order.merchant_uid}</div>
                          <div>주문명: {order.name}</div>
                          <div>주문 상태: {order.status}</div>
                        </div>
                        <Button
                          disabled={order.status === "cancelled"}
                          onClick={() => {
                            onCancelled(order.merchant_uid);
                          }}
                        >
                          주문 취소
                        </Button>
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
    </div>
  );
}
