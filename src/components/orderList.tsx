import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetOrders from "@/hooks/order/useGetOrders";
import useCancelOrderMutation from "@/hooks/order/useCancelOrderMutation";
import useCancelOrder from "@/hooks/order/useCancelOrder";
import OrderComponent from "./orderComponent";
import { OrderType } from "@/types/order";
import SelectOrderState from "./selectOrderStatus";
import Alert from "./alert";
import { Loader2 } from "lucide-react";
import useShowAlert from "@/hooks/useShowAlert";
import useWindowWidth from "@/hooks/useWindowWidth";

// 페이지네이션 ?
export default function OrderList({ isAdmin }: { isAdmin: boolean }) {
  const { width } = useWindowWidth();
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  const userInfo = useContext(AuthContext);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, refetch } = useGetOrders(isAdmin, userInfo?.id);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const { cancelOrder } = useCancelOrderMutation(refetch);
  const { onCancelOrder, setCancelShowAlert, cancelShowAlert, cancelAlertContent } = useCancelOrder(cancelOrder);
  const { alertContent, setShowAlert, setAlertContent, confirm, showAlert, setConfirm } = useShowAlert();
  const labels = ["주문번호", "이미지", "주문상품", "상품가격", "수량", "합계", "배송정보"];
  const [ordersWithTitle, setOrdersWithTitle] = useState<OrderType[]>();
  const [orderToCancel, setOrderToCancel] = useState<OrderType>();

  const orders = useMemo(() => {
    if (data?.pages !== null) {
      return data?.pages as OrderType[];
    }
    return [];
  }, [data]);

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
    if (confirm && orderToCancel) {
      onCancelOrder(orderToCancel.merchant_uid);
    }
  }, [confirm]);

  function onConfirmCancel(order: OrderType) {
    setShowAlert(true);
    setOrderToCancel(order);
    setAlertContent({
      title: "주문 조회",
      desc: `${order.name}의 주문을 취소하시겠습니까?`,
      nav: null,
    });
  }

  return (
    <>
      <Alert alertContent={cancelAlertContent} setShowAlert={setCancelShowAlert} showAlert={cancelShowAlert} />
      <Alert alertContent={alertContent} setShowAlert={setShowAlert} showAlert={showAlert} setConfirm={setConfirm} />

      <div className="flex flex-col mt-4">
        <hr />
        {!isLoading && ordersWithTitle ? (
          <div className="mt-4 flex flex-col gap-5 text-base">
            {ordersWithTitle?.map((order) => (
              <div key={order.merchant_uid}>
                <div className="flex flex-row items-center lg:gap-3 lg:text-base text-sm">
                  <OrderComponent order={order} labels={labels} />
                  <div className="lg:w-[128px] w-[90px] flex justify-center">
                    {order.merchant_uid ? (
                      !isAdmin ? (
                        <button
                          className="border px-2 py-1 rounded text-sm bg-white disabled:bg-zinc-100 disabled:text-zinc-500"
                          id="cancel_order"
                          disabled={order.status === "주문 취소"}
                          onClick={() => onConfirmCancel(order)}
                        >
                          {width > 640 ? <>취소하기</> : <>취소</>}
                        </button>
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
                <hr className="mt-4" />
              </div>
            ))}
          </div>
        ) : (
          <p>주문이 존재하지 않습니다.</p>
        )}
      </div>
      {/* 다음 페이지 로딩 중인 경우 */}
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <Loader2 className="h-10 w-10 animate-spin" />}
      </div>
    </>
  );
}
