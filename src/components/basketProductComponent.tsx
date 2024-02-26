import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction, memo, useContext, useEffect } from "react";
import QuantityInput from "./quantityInput";
import { useBasketContext } from "@/routes";
import useBasket from "@/hooks/basket/useBasket";
import { AuthContext } from "@/context/authContext";
import Alert from "./alert";
import useShowAlert from "@/hooks/useShowAlert";

function BasketProductComponent({
  product,
  labels,
  basketProducts,
  setBasketProducts,
}: {
  product: BasketProductType;
  labels: string[];
  basketProducts: BasketProductType[];
  setBasketProducts: Dispatch<SetStateAction<BasketProductType[]>>;
}) {
  const { basketContext, setBasketContext } = useBasketContext();

  const { removeFromBasket } = useBasket(setBasketContext);
  const userInfo = useContext(AuthContext);

  const foundProduct = basketContext.find((basketProduct) => basketProduct.id === product.id);
  let totalPrice = 0;
  if (foundProduct) {
    totalPrice = foundProduct.quantity * product.price;
  }
  const { setShowAlert, setAlertContent, showAlert, alertContent, setConfirm, confirm } = useShowAlert();

  useEffect(() => {
    if (confirm) {
      removeFromBasket(userInfo?.id ? userInfo?.id : null, product.id);
    }
  }, [confirm]);
  return (
    <>
      <Alert alertContent={alertContent} showAlert={showAlert} setShowAlert={setShowAlert} setConfirm={setConfirm} />

      <div key={product.id} className="w-full grid text-center items-center">
        {product.id !== "" ? (
          <div className="grid grid-flow-col md:grid-cols-6 grid-cols-5 gap-2 text-sm md:text-base">
            <div className="flex justify-center items-center">
              <div>
                <img src={product.image} width={96} height={96} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              [{product.format}] {product.name}
            </div>
            <div className="flex items-center justify-center">{product.price}원</div>
            <div className="flex justify-center items-center">
              {/* 장바구니 페이지 안에서만 수량 변경 */}
              <QuantityInput product={product} basketProducts={basketProducts} setBasketProducts={setBasketProducts} />
            </div>
            <div className="md:flex hidden items-center justify-center">{totalPrice.toLocaleString()}원</div>
            <div className="flex justify-center items-center">
              <button
                id="delete_basket"
                className="border px-2 py-1 rounded text-sm"
                onClick={() => {
                  setShowAlert(true);
                  setAlertContent({
                    title: "장바구니",
                    desc: `장바구니에서 ${product.name} 상품을 삭제하시겠습니까?`,
                    nav: null,
                  });
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-6 grid-cols-5">
            {labels.map((label, index) =>
              label === "합계" ? (
                <div className="hidden md:grid" key={index}>
                  {label}
                </div>
              ) : (
                <div key={index}>{label}</div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default memo(BasketProductComponent);
