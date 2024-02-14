import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetOrders from "@/hooks/order/useGetOrders";
import useCancelOrderMutation from "@/hooks/order/useCancelOrderMutation";
import useCancelOrder from "@/hooks/order/useCancelOrder";
import OrderComponent from "./orderComponent";
import { OrderType } from "@/types/order";
import { Button } from "./ui/button";
import SelectOrderState from "./selectOrderStatus";

// 이건 페이지네이션 ?
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

  const labels = ["주문번호/시각", "이미지", "주문상품", "상품 가격", "수량", "합계", "배송정보"];
  const [ordersWithTitle, setOrdersWithTitle] = useState<OrderType[]>();
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    // basket이 null이 아닌 경우에만 상태를 업데이트하도록 처리
    if (data?.pages !== null) {
      setOrders(data?.pages as OrderType[]);
    }
  }, [data]); // basket이 변경될 때마다 호출

  useEffect(() => {
    if (orders) {
      const withTitle = [
        {
          merchant_uid: "",
          amount: 0,
          name: "",
          status: "",
          products: [],
          orderedAt: 0,
          buyer_uid: "",
          buyer_name: "",
          buyer_tel: "",
          buyer_email: "",
          buyer_addr: "",
          buyer_postcode: "",
        },
        ...orders.flat(),
      ];
      setOrdersWithTitle(withTitle);
    }
  }, [orders]);

  useEffect(() => {
    console.log(ordersWithTitle);
  }, [ordersWithTitle]);

  return (
    <div className="flex flex-col mt-4">
      <hr />
      {status === "success" ? (
        <div className="mt-4 flex flex-col gap-5 text-base">
          {ordersWithTitle ? (
            <div className="mt-4 flex flex-col gap-5 text-base">
              {ordersWithTitle?.map((order) => (
                <div key={order.merchant_uid} className="flex flex-row items-center gap-3">
                  <OrderComponent order={order} labels={labels} />
                  <div className=" w-[128px] flex justify-center">
                    {order.merchant_uid ? (
                      !isAdmin ? (
                        <Button
                          disabled={order.status === "주문 취소"}
                          onClick={() => {
                            onCancelOrder(order.merchant_uid, order.name);
                          }}
                          className="bg-zinc-0 border-zinc-800 border text-zinc-800 hover:bg-zinc-100 disabled:bg-zinc-100"
                        >
                          취소하기
                        </Button>
                      ) : (
                        <SelectOrderState id={order.merchant_uid} />
                      )
                    ) : isAdmin ? (
                      <div>주문상태</div>
                    ) : (
                      <div>주문취소</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>주문이 존재하지 않습니다.</p>
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
      {/* 다음 페이지 로딩 중인 경우 */}
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </div>
  );
}
