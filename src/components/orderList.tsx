import { AuthContext } from "@/context/authContext";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import useGetOrders from "@/hooks/order/useGetOrders";
import useCancelOrderMutation from "@/hooks/order/useCancelOrderMutation";
import useCancelOrder from "@/hooks/order/useCancelOrder";
import SelectOrderState from "./selectOrderStatus";

// 이건 페이지네이션으로 ?
export default function OrderList({ isAdmin }: { isAdmin: boolean }) {
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  const userInfo = useContext(AuthContext);
  const { data, status, isFetchingNextPage, prefetchNextPage, refetch } = useGetOrders(isAdmin, userInfo.id);

  useEffect(() => {
    if (inView) {
      prefetchNextPage();
    }
  }, [inView]);

  const { cancelOrder } = useCancelOrderMutation(refetch);
  const { onCancelOrder } = useCancelOrder(cancelOrder);

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
                        {!isAdmin ? (
                          <Button
                            disabled={order.status === "주문 취소"}
                            onClick={() => {
                              onCancelOrder(order.merchant_uid);
                            }}
                          >
                            주문 취소
                          </Button>
                        ) : (
                          <SelectOrderState id={order.merchant_uid} />
                        )}
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
