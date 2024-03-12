import { AuthContext } from "@/context/authContext";
import useBasket from "@/hooks/basket/useBasket";
import { useBasketContext } from "@/routes";
import { BasketProductType } from "@/types/product";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export default function DrawerBasket({
  setIsAdded,
  productId,
}: {
  setIsAdded: Dispatch<SetStateAction<boolean>>;
  productId: string;
}) {
  const userId = useContext(AuthContext)?.id || null;
  const [isRemoved, setIsRemoved] = useState(false);
  const { setBasketContext } = useBasketContext(); // 전역상태
  const { getBasket, removeFromBasket } = useBasket(setBasketContext); // localStorage
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 장바구니 정보를 가져와서 상태를 설정
    const initialBasket = getBasket();
    setBasket(initialBasket);
  }, []);

  useEffect(() => {
    const loadedBasket = getBasket();
    setBasket(loadedBasket);
  }, [isRemoved]);

  function onDelete(product: BasketProductType) {
    removeFromBasket(userId, product.id);
    setIsRemoved(!isRemoved);
    setIsAdded(productId !== product.id);
  }

  return (
    <div className="text-zinc-900 p-6 sm:p-8">
      <div className="text-lg">장바구니 ({basket.length})</div>
      <div className="mt-4 flex flex-col gap-3">
        {basket.map((product: BasketProductType) => (
          <div key={product.id} className="flex flex-row gap-3 text-zinc-800">
            <img alt={product.name} src={product.image} width={96} height={96} />
            <div className="flex flex-col relative w-full gap-1 text-sm justify-center">
              <div>{product.name}</div>
              <div>수량: {product.quantity}</div>
              <div>가격: {(product.quantity * product.price).toLocaleString()}원</div>
              <button
                id="delete_product"
                name="상품 삭제"
                className="absolute top-0 right-0 text-base"
                onClick={() => onDelete(product)}
              >
                <X width={14} height={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
