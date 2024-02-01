import DrawerBasket from "@/components/drawerBasket";
import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import RecommandProducts from "@/components/recommandProducts";
import { Button } from "@/components/ui/button";
import { DrawerRight, DrawerRightContent, DrawerRightTrigger } from "@/components/ui/drawerRight";
import { BasketContext } from "@/context/basketContext";
import { ProductType } from "@/types";
import { DocumentData } from "firebase/firestore";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 구매자가 보는 상품 상세 페이지
export default function Product() {
  //   const navigate = useNavigate();
  const { state }: DocumentData = useLocation();
  const product = state as ProductType;

  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }

  const { basket, setBasket } = contextValue;

  const productQuantity = basket?.find((item) => item.id === product.id)?.quantity || 1;
  let basketProduct = { ...(state as ProductType), quantity: productQuantity }; // 장바구니 형태의 product로 변경. (수량 항목 추가)
  //   const [quantity, setQuantity] = useState<number>(productQuantity);
  let isProductInBasket = false;
  if (Array.isArray(basket)) {
    // basket이 배열인 경우에만
    isProductInBasket = basket.some((product) => basketProduct.id === product.id);
  }
  const [isAdded, setIsAdded] = useState(isProductInBasket);

  // 장바구니에 추가
  function addProductToBasket() {
    setBasket((prev) => {
      if (prev && !prev.some((item) => basketProduct.id === item.id)) {
        return [...prev, basketProduct];
      } else if (!prev) {
        return [basketProduct];
      }
      return prev;
    });
    setIsAdded(true);
  }

  return (
    <div className="flex flex-col ml-10">
      <ProductInfo product={basketProduct} isAdmin={false} />
      {/* 버튼 영역 */}
      <div className="w-full right-0 flex justify-end items-center gap-3 mt-5">
        <DrawerRight direction="right">
          {!isAdded ? (
            <Button
              onClick={() => addProductToBasket()}
              className="bg-zinc-0 border border-zinc-500 text-zinc-900 w-28 hover:bg-zinc-100"
            >
              장바구니 추가
            </Button>
          ) : (
            <DrawerRightTrigger>
              <div className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded text-sm font-medium ring-offset-background transition-colors bg-zinc-0 border border-zinc-400 text-zinc-700 w-28 hover:bg-zinc-100">
                장바구니 보기
              </div>
            </DrawerRightTrigger>
          )}
          <DrawerRightContent className="w-[350px]">
            <DrawerBasket setIsAdded={setIsAdded} />
          </DrawerRightContent>
        </DrawerRight>

        <Button className="bg-zinc-400 w-28 hover:bg-zinc-500">구매하기</Button>
      </div>
      <hr className="mt-8" />
      <RecommandProducts category={state.category} productName={basketProduct.name} />
      <hr className="mt-10" />
      <ProductDetail product={state} /> {/* 변경하기 */}
    </div>
  );
}
