import { ProductType } from "@/types/product";
import NumberInput from "./ui/numberInput";
import { Dispatch, SetStateAction, memo } from "react";

function ProductInfo({
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
    <div className="flex mt-6 justify-center flex-col items-center md:items-start">
      <div className="flex w-full justify-between items-end flex-row">
        <div className="text-xl">
          [{product.format}] {product.name}
        </div>
        <div className="text-sm text-zinc-600 text-right text-nowrap flex">
          {
            <>
              <span className="hidden md:flex">카테고리:&nbsp;</span>
              <>{product.category}</>
            </>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-502 w-full mt-6 ">
        <div className="flex justify-center lg:justify-start">
          <div className="w-80 h-80">
            {product.image ? (
              <img
                decoding="async"
                src={product.image[0]}
                alt={product.name}
                width={320}
                height={320}
                className="w-80 h-80 object-contain"
              />
            ) : (
              <div className="w-80 h-80 bg-zinc-100" />
            )}
          </div>
        </div>
        <div className="flex-grow mt-8 lg:mt-0">
          <hr />
          <div className="grid grid-cols-302 md:grid-cols-202 text-lg md:text-xl text-zinc-900 my-3 ml-4">
            <h3>상품명</h3>
            <h3>
              [{product.format}] {product.name}
            </h3>
          </div>
          <hr />
          <div className="grid grid-cols-302 md:grid-cols-202 mt-3 ml-4 gap-1 md:text-base text-sm">
            <h4 className="text-zinc-600 font-bold">판매가</h4>
            <h4 className="text-zinc-600 font-bold">{product.price}원</h4>
            <h5 className="text-zinc-900 mt-2">재고</h5>
            <h5 className="text-zinc-500 mt-2">{product.stock}</h5>
            <h5 className="text-zinc-900">Artist</h5>
            <h5 className="text-zinc-500 font-light">{product.artist}</h5>
            <h5 className="text-zinc-900">Label</h5>
            <h5 className="text-zinc-500 font-light">{product.label}</h5>
            <h5 className="text-zinc-900">Released</h5>
            <h5 className="text-zinc-500 font-light">{product.released}</h5>
            <h5 className="text-zinc-900">Format</h5>
            <h5 className="text-zinc-500 font-light">{product.format}</h5>
          </div>
          {!isAdmin && quantity && setQuantity ? (
            <div className="flex justify-between bg-zinc-100 w-full p-5 pr-2 md:pr-3 mt-5 md:text-lg font-normal text-zinc-700">
              [{product.format}] {product.name}
              <NumberInput product={product} quantity={quantity} setQuantity={setQuantity} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default memo(ProductInfo);
