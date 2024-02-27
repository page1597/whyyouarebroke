import useWindowWidth from "@/hooks/useWindowWidth";
import { OrderType } from "@/types/order";
import { memo } from "react";

function OrderComponent({ order, labels }: { order: OrderType; labels: string[] }) {
  const span = order.products.length;
  const { width } = useWindowWidth();
  return (
    <div className="w-full grid text-center items-center">
      {order.merchant_uid !== "" ? (
        <div className="grid grid-flow-col lg:grid-cols-7 gap-2 grid-cols-5">
          <div
            style={{ gridRow: `span ${span}` }}
            className="text-xs lg:text-sm justify-center items-center self-center"
          >
            <div className="truncate overflow-hidden">{order.merchant_uid}</div>
            <div className="text-zinc-400">{new Date(order.orderedAt).toLocaleString()}</div>
            <div className="mt-1">{order.buyer_name}</div>
          </div>
          {order.products.map((product) => (
            <div key={product.id} className=" flex justify-center items-center">
              <img src={product.image} width={96} height={96} />
            </div>
          ))}
          {order.products.map((product) => (
            <div key={product.id} className="justify-center flex items-center lg:text-base text-sm">
              {product.name}
            </div>
          ))}
          {order.products.map((product) => (
            <div key={product.id} className="justify-center items-center lg:text-base text-nowrap lg:flex hidden">
              {product.price.toLocaleString()}원
            </div>
          ))}
          {order.products.map((product) => (
            <div key={product.id} className="justify-center flex items-center lg:text-base text-sm">
              {product.quantity}개
            </div>
          ))}
          <div style={{ gridRow: `span ${span}` }} className="flex justify-center items-center lg:text-base text-sm">
            {order.amount.toLocaleString()}
            {width > 640 ? <>원</> : <></>}
          </div>
          <div style={{ gridRow: `span ${span}` }} className="hidden lg:flex justify-center items-center">
            {order.buyer_addr}
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-7 grid-cols-5">
          {labels.map((label, index) =>
            label === "배송정보" || label === "상품가격" ? (
              <div className="hidden lg:flex text-nowrap justify-center" key={index}>
                {label}
              </div>
            ) : (
              <div key={index} className="text-nowrap">
                {label}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default memo(OrderComponent);
