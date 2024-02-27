import PaymentFormModal from "./paymentFormModal";
import BasketProductComponent from "./basketProductComponent";
import { Checkbox } from "@/components/ui/checkbox";
import useBasketList from "@/hooks/basket/useBasketList";
import { memo } from "react";
import { useBasketContext } from "@/routes";

function BasketList() {
  const { setBasketContext, basketContext } = useBasketContext();
  const { basketWithTitle, checkedProductIds, checkedProducts, totalPrice, onCheck } = useBasketList(basketContext);
  const labels = ["이미지", "상품명", "판매가", "수량", "합계", "삭제"];
  const shippingFee = 3000;

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
                    : checkedProductIds.length == basketContext.length
                }
                onCheckedChange={(checked) => onCheck(product.id, checked)}
              />
              <BasketProductComponent
                product={product}
                labels={labels}
                basketProducts={basketContext}
                setBasketProducts={setBasketContext}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <hr className="my-6" />
      <div className="flex w-full md:justify-end justify-center md:gap-2 gap-1 items-center text-zinc-700 md:text-sm text-xs text-nowrap">
        <div>상품구매금액</div>
        <div className="text-zinc-500 font-bold text-base">{totalPrice.toLocaleString()}원</div>
        <div>+</div>
        <div>배송비</div>
        <div className="text-zinc-500 font-bold text-base">{shippingFee.toLocaleString()}원</div>
        <div>=</div>
        <div>합계</div>
        <div className="text-zinc-700 font-bold text-xl">{(totalPrice + shippingFee).toLocaleString()}원</div>
      </div>
      <PaymentFormModal checkedProducts={checkedProducts} basketProducts={basketContext} />
    </div>
  );
}
export default memo(BasketList);
