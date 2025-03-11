import DrawerBasket from "@/components/list/drawerBasket";
import ProductDetail from "@/components/detail/productDetail";
import ProductInfo from "@/components/detail/productInfo";
import RecommendProducts from "@/components/list/recommendProducts";
import { Button } from "@/components/ui/button";
import { DrawerRight, DrawerRightContent, DrawerRightTrigger } from "@/components/ui/drawerRight";
import { AuthContext } from "@/context/authContext";
import useBasket from "@/hooks/basket/useBasket";
import useCheckIsInBasket from "@/hooks/basket/useCheckIsInBasket";
import useGetProduct from "@/hooks/product/useGetProduct";
import { memo, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useBasketContext } from "..";
import { ScrollArea } from "@/components/ui/scroll-area";

// 구매자가 보는 상품 상세 페이지
function Product() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const userId = useContext(AuthContext)?.id || null;

  const { isLoading, product } = useGetProduct(productId);
  const { isAdded, setIsAdded, quantity, setQuantity } = useCheckIsInBasket(productId);
  const { setBasketContext } = useBasketContext();
  const { addToBasket } = useBasket(setBasketContext);

  function onAddBasket() {
    addToBasket(userId, product!, quantity);
    setIsAdded(true);
  }

  return (
    <div className="flex flex-col">
      {!isLoading && product ? (
        <ProductInfo product={product} isAdmin={false} quantity={quantity} setQuantity={setQuantity} />
      ) : (
        <></>
      )}
      <div className="w-full md:right-0 flex justify-center md:justify-end items-center gap-3 mt-5">
        <DrawerRight direction="right">
          {!isAdded ? (
            <Button
              id="add_basket"
              onClick={onAddBasket}
              className="bg-zinc-0 border border-zinc-500 text-zinc-900 w-28 hover:bg-zinc-100"
            >
              장바구니 추가
            </Button>
          ) : (
            <DrawerRightTrigger id="check_basket">
              <div className="inline-flex items-center justify-center whitespace-nowrap h-10 px-4 py-2 rounded text-sm font-medium ring-offset-background transition-colors bg-zinc-0 border border-zinc-400 text-zinc-700 w-28 hover:bg-zinc-100">
                장바구니 보기
              </div>
            </DrawerRightTrigger>
          )}
          <DrawerRightContent>
            <ScrollArea>
              {productId ? <DrawerBasket setIsAdded={setIsAdded} productId={productId} /> : <></>}
            </ScrollArea>
          </DrawerRightContent>
        </DrawerRight>

        <Button id="purchase" className="bg-zinc-400 w-28 hover:bg-zinc-500">
          구매하기
        </Button>
      </div>
      <hr className="mt-8" />
      {product ? <RecommendProducts category={product.category} productId={product.id} /> : <></>}
      <hr className="mt-10" />
      {product ? <ProductDetail product={product} /> : <></>}
    </div>
  );
}
export default memo(Product);
