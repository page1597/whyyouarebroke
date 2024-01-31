import { ProductType } from "@/types";

export default function ProductInfo({ product, isAdmin }: { product: ProductType; isAdmin: boolean }) {
  return (
    <div>
      <div className="text-xl text-zinc-800">
        [{product.format}] {product.name}
      </div>
      <div className="flex flex-row mt-8">
        <div className="w-80 h-80">
          {product.image ? (
            <img src={product.image[0]} alt={product.name} width={320} height={320} />
          ) : (
            <div className="w-60 h-60 bg-zinc-100" />
          )}
        </div>
        <div className="ml-6 flex-grow">
          <hr />
          <div className="grid grid-cols-402 text-xl text-zinc-900 my-3 ml-4">
            <h3>상품명</h3>
            <h3>
              [{product.format}] {product.name}
            </h3>
          </div>
          <hr />
          <div className="grid grid-cols-402 mt-3 ml-4 gap-1">
            <h4 className="text-zinc-600 text-base font-bold">판매가</h4>
            <h4 className="text-zinc-600 text-base font-bold">{product.price}</h4>
            <h5 className="text-zinc-900 text-base mt-2">재고</h5>
            <h5 className="text-zinc-500 text-base mt-2">{product.stock}</h5>
            <h5 className="text-zinc-900 text-base">Artist</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.artist}</h5>
            <h5 className="text-zinc-900 text-base">Label</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.label}</h5>
            <h5 className="text-zinc-900 text-base">Released</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.released}</h5>
            <h5 className="text-zinc-900 text-base">Format</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.format}</h5>
          </div>
          {!isAdmin ? (
            <div className="bg-zinc-100 w-full p-5 mt-5 text-lg font-normal text-zinc-700">
              [{product.format}] {product.name}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
