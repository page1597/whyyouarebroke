import { AuthContext } from "@/context/authContext";
import useBasket from "@/hooks/basket/useBasket";
// import { getBasket, removeFromBasket } from "@/services/local/basket";
import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export default function DrawerBasket({
  setIsAdded,
  productId,
}: {
  setIsAdded: Dispatch<SetStateAction<boolean>>;
  productId: string;
}) {
  const [basket, setBasket] = useState<BasketProductType[]>([]);
  const userId = useContext(AuthContext)?.id || null;
  const [isRemoved, setIsRemoved] = useState(false);
  const { getBasket, removeFromBasket } = useBasket();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 장바구니 정보를 가져와서 상태를 설정
    const initialBasket = getBasket();
    setBasket(initialBasket);
  }, []);

  useEffect(() => {
    const initialBasket = getBasket();
    setBasket(initialBasket);
  }, [isRemoved]);

  return (
    <div className="p-8 text-zinc-900">
      <div className="text-xl">장바구니 ({basket.length})</div>
      <div className="mt-6 flex flex-col gap-4">
        {basket.map((product: BasketProductType) => (
          <div key={product.id} className="flex flex-row gap-5 text-zinc-800">
            <img
              decoding="async"
              loading="lazy"
              alt={product.name}
              src={product.image}
              width={96}
              height={96}
              className="w-24 h-24 object-cover"
            />
            <div className="flex flex-col relative w-full gap-2 text-sm">
              <div>{product.name}</div>
              <div>수량: {product.quantity}</div>
              <div>가격: {product.quantity * product.price}원</div>
              <button
                id="delete_product"
                name="상품 삭제"
                className="absolute top-0 right-0 text-lg"
                onClick={() => {
                  removeFromBasket(userId, product.id);
                  setIsRemoved(!isRemoved);
                  setIsAdded(productId !== product.id);
                }}
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
