import { BasketContext } from "@/context/basketContext";
import { BasketProductType } from "@/types";
import { Dispatch, SetStateAction, useContext } from "react";
import NumberInput from "./ui/numberInput";

export default function DrawerBasket({ setIsAdded }: { setIsAdded: Dispatch<SetStateAction<boolean>> }) {
  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }

  const { basket, setBasket } = contextValue;
  // 장바구니에서 제거
  const removeProductFromBasket = (productId: string) => {
    setBasket((prev) => {
      if (prev) {
        return prev.filter((product) => product.id !== productId);
      }
      return null;
    });
    setIsAdded(false);
  };

  return (
    <div className="p-8 text-zinc-900">
      <div className="text-xl">장바구니 ({basket?.length})</div>
      <div className="mt-6 flex flex-col gap-4">
        {basket?.map((product: BasketProductType) => (
          <div key={product.id} className="flex flex-row gap-5 text-zinc-800">
            <img alt={product.name} src={product.image} width={128} height={128} className="w-24 h-24 object-cover" />
            <div className="flex flex-col relative w-full gap-2 text-sm">
              <div>{product.name}</div>
              <div>가격: {product.price}원</div>
              <NumberInput product={product} />
              <button
                name="상품 삭제"
                className="absolute top-0 right-0 text-lg"
                onClick={() => removeProductFromBasket(product.id)}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
