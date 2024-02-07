import PaymentFormModal from "./paymentFormModal";
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import BasketProductComponent from "./basketProductComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { BasketProductType } from "@/types";

export default function BasketList({ basket }: { basket: BasketProductType[] }) {
  function submitPayment(basket: BasketProductType[]) {
    // const newStock = basket[0].stock - basket[0].quantity;
    // updateProduct(basket[0].id, newStock); // 재고 감소
    // // 결제가 이루어지기 전에 결제가 취소된다면 상품 재고를 복구
  }

  const [basketProducts, setBasketProducts] = useState<BasketProductType[]>(basket); // 수량 변경 반영
  const [checkedProductIds, setCheckedProductIds] = useState<string[]>([]); // id 배열

  const [checkedProducts, setCheckedProducts] = useState<BasketProductType[]>([]); // 진짜로 결제하려고 선택한 애들
  const totalPrice = checkedProducts.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );
  const shippingFee = 3000;

  const basketWithTitle = basket.slice();
  const title: BasketProductType = {
    image: null,
    name: "",
    price: -1,
    quantity: -1,
    id: "",
    format: null,
    stock: 0,
  };
  basketWithTitle.unshift(title);

  useEffect(() => {
    let checkedProductList: BasketProductType[] = [];
    checkedProductIds.forEach((id) => {
      const product = basketProducts.find((item) => item.id == id);
      if (product) {
        checkedProductList.push(product);
      }
    });
    setCheckedProducts(checkedProductList);
  }, [checkedProductIds, basketProducts]);

  // 장바구니 상태관리가 이상함.. 정리하기
  function onCheck(newProductId: string, checked: CheckedState) {
    if (newProductId === "") {
      if (checked) {
        let allProductsIdList: string[] = [];
        basketProducts.map((product) => {
          allProductsIdList.push(product.id);
        });
        setCheckedProductIds(allProductsIdList);
      } else {
        setCheckedProductIds([]);
      }
    } else {
      if (checked) {
        setCheckedProductIds((prevCheckedProductIds) => [...prevCheckedProductIds, newProductId]);
      } else {
        setCheckedProductIds((prevCheckedProductIds) => prevCheckedProductIds.filter((id) => id !== newProductId));
      }
    }
  }

  return (
    <div className="flex flex-col mt-4">
      <hr />
      {basketWithTitle ? (
        <div className="mt-4 flex flex-col gap-5 text-base">
          {basketWithTitle.map((product) => (
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
