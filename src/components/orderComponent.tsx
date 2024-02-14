import { OrderType } from "@/types/order";

export default function OrderComponent({ order, labels }: { order: OrderType; labels: string[] }) {
  const rowSpan = `row-span-${order.products.length}`;
  return (
    <div key={order.merchant_uid} className="w-full grid text-center items-center">
      {order.merchant_uid !== "" ? (
        <div className="grid grid-flow-col grid-cols-7 gap-2">
          <div className={`${rowSpan} justify-center flex items-center flex-col`}>
            <div>{order.merchant_uid}</div>
            <div className="text-zinc-400 text-sm">{new Date(order.orderedAt).toLocaleString()}</div>
            <div className="mt-1">{order.buyer_name}</div>
          </div>
          {order.products.map((product) => (
            <div className="w-42 h-24 flex justify-center items-center">
              <img src={product.image} width={96} height={96} />
            </div>
          ))}
          {order.products.map((product) => (
            <div className="justify-center flex items-center">{product.name}</div>
          ))}
          {order.products.map((product) => (
            <div className="justify-center flex items-center">{product.price}원</div>
          ))}
          {order.products.map((product) => (
            <div className="justify-center flex items-center">{product.quantity}개</div>
          ))}

          <div className={`${rowSpan} } justify-center flex items-center`}>{order.amount}원</div>
          <div className={`${rowSpan} } justify-center flex items-center`}>{order.buyer_addr}</div>
          {/* <div className="bg-red-300">04</div>
          <div className="bg-red-100">05</div>
          <div className="bg-red-300">04</div>
          <div className="bg-red-100">05</div>
          <div className="bg-red-300">04</div>
          <div className="bg-red-100">05</div>
          <div className="row-span-2 bg-red-400">01</div>
          <div className="row-span-2 bg-red-400">01</div> */}
        </div>
      ) : (
        <div className="grid grid-cols-7">
          {labels.map((label) => (
            <div>{label}</div>
          ))}
        </div>
      )}
    </div>
  );
}
