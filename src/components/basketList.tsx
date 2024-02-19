import PaymentFormModal from "./paymentFormModal";
import BasketProductComponent from "./basketProductComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { BasketProductType } from "@/types/product";
import useBasketList from "@/hooks/basket/useBasketList";
import { memo } from "react";
function BasketList({ basket }: { basket: BasketProductType[] | null }) {
  const shippingFee = 3000;
  const {
    basketProducts,
    setBasketProducts,
    basketWithTitle,
    checkedProductIds,
    checkedProducts,
    totalPrice,
    onCheck,
  } = useBasketList(basket);

  const labels = ["이미지", "상품명", "판매가", "수량", "합계"];

  return (
    <div className="flex flex-col mt-4">
      <hr />
      {basketWithTitle ? (
        <div className="mt-4 flex flex-col gap-5 text-base">
          {basketWithTitle?.map((product) => (
            <div key={product.id} className="flex flex-row items-center gap-3">
              <Checkbox
                id={product.id}
                checked={
                  product.id !== ""
                    ? checkedProductIds.some((id) => id === product.id)
                    : checkedProductIds.length == basketProducts.length
                }
                onCheckedChange={(checked) => onCheck(product.id, checked)}
              />
              <BasketProductComponent
                product={product}
                labels={labels}
                basketProducts={basketProducts}
                setBasketProducts={setBasketProducts}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <hr className="my-6" />
      <div className="flex w-full justify-end gap-2 items-center text-zinc-700 text-sm">
        <div>상품구매금액</div>
        <div className="text-zinc-500 font-bold text-base">{totalPrice}원</div>
        <div>+</div>
        <div>배송비</div>
        <div className="text-zinc-500 font-bold text-base">{shippingFee}원</div>
        <div>=</div>
        <div>합계</div>
        <div className="text-zinc-700 font-bold text-xl">{totalPrice + shippingFee}원</div>
      </div>
      <PaymentFormModal checkedProducts={checkedProducts} basketProducts={basketProducts} />
    </div>
  );
}
export default memo(BasketList);
