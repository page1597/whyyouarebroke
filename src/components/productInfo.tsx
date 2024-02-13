import { ProductType } from "@/types/product";
import NumberInput from "./ui/numberInput";
import { Dispatch, SetStateAction } from "react";

export default function ProductInfo({
  product,
  isAdmin,
  quantity,
  setQuantity,
}: {
  product: ProductType; // 구매자페이지 | 판매자페이지(Admin)
  isAdmin: boolean;
  quantity?: number;
  setQuantity?: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-center flex-col items-center md:items-start">
      <div className="flex justify-between w-full items-center mt-6 text-zinc-800">
        <div className="text-xl">
          [{product.format}] {product.name}
        </div>
        <div className="text-sm text-zinc-600">카테고리: {product.category}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-502 w-full mt-6">
        <div className="flex justify-center md:justify-start ">
          <div className="w-80 h-80">
            {product.image ? (
              <img
                src={product.image[0]}
                alt={product.name}
                width={320}
                height={320}
                className="w-80 h-80 object-contain"
              />
            ) : (
              <div className="w-60 h-60 bg-zinc-100" />
            )}
          </div>
        </div>
        <div className="flex-grow mt-8 md:mt-0">
          <hr />
          <div className="grid grid-cols-402 md:grid-cols-202 text-xl text-zinc-900 my-3 ml-4">
            <h3>상품명</h3>
            <h3>
              [{product.format}] {product.name}
            </h3>
          </div>
          <hr />
          <div className="grid md:grid-cols-202 mt-3 ml-4 gap-1">
            <h4 className="text-zinc-600 text-base font-bold">판매가</h4>
            <h4 className="text-zinc-600 text-base font-bold">{product.price}원</h4>
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

          {!isAdmin && quantity && setQuantity ? (
            <div className="flex justify-between bg-zinc-100 w-full p-5 mt-5 text-lg font-normal text-zinc-700">
              [{product.format}] {product.name}
              <NumberInput
                // product={"quantity" in product ? product : undefined}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
