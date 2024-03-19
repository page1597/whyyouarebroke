import useWindowWidth from "@/hooks/useWindowWidth";
import { OrderType } from "@/types/order";
import { memo } from "react";

function OrderCard({ order, labels }: { order: OrderType; labels: string[] }) {
  const { width } = useWindowWidth();
  const span = order.products.length;

  function OrderElement({ className, type }: { className?: string; type: string }) {
    return (
      <>
        {order.products.map((product) => (
          <div key={product.id} className={`justify-center items-center ${className}`}>
            {type == "image" && <img src={product.image} width={96} height={96} />}
            {type == "name" && product.name}
            {type == "price" && <>{product.price.toLocaleString()}원</>}
            {type == "quantity" && <>{product.quantity}개</>}
            {type == "address" && <div style={{ gridRow: `span ${span}` }}>{order.buyer_addr}</div>}
          </div>
        ))}
      </>
    );
  }

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
          <OrderElement type="image" className="flex" />
          <OrderElement type="name" className="flex lg:text-base text-sm" />
          <OrderElement type="price" className="lg:text-base text-nowrap lg:flex hidden" />
          <OrderElement type="quantity" className="flex lg:text-base text-sm" />
          <div style={{ gridRow: `span ${span}` }} className="flex justify-center items-center lg:text-base text-sm">
            {order.amount.toLocaleString()}
            {width > 640 ? <>원</> : <></>}
          </div>
          <OrderElement type="address" className="hidden lg:flex" />
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
export default memo(OrderCard);
