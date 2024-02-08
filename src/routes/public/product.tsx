import DrawerBasket from "@/components/drawerBasket";
import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import RecommandProducts from "@/components/recommandProducts";
import { Button } from "@/components/ui/button";
import { DrawerRight, DrawerRightContent, DrawerRightTrigger } from "@/components/ui/drawerRight";
import { AuthContext } from "@/context/authContext";
import { addToBasket, isInBasket } from "@/services/basket";
import { getProduct } from "@/services/firebase";
import { ProductType } from "@/types";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// 구매자가 보는 상품 상세 페이지
export default function Product() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id"); // param 으로 가져오는 product id
  const [product, setProduct] = useState<ProductType | undefined>();
  const userId = useContext(AuthContext)?.id || null;

  if (productId == null || productId == "") {
    throw Error("해당 상품이 존재하지 않습니다.");
  }
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (productId) {
      getProductInfo(productId);
    }
  }, [productId]);

  async function getProductInfo(productId: string) {
    const result = await getProduct(productId);
    setProduct(result as ProductType);
  }

  const [quantity, setQuantity] = useState(1); // quantity (수량)
  const [isAdded, setIsAdded] = useState(false); // 장바구니에 추가된 상품인지 여부

  useEffect(() => {
    const isIn = isInBasket(productId);
    setIsAdded(isIn);
    console.log(isIn);
  }, [productId]);

  useEffect(() => {
    console.log("changed");
    setIsAdded(false);
  }, [quantity]);

  return (
    <div className="flex flex-col">
      {product ? (
        <ProductInfo
          product={product}
          // product={basketProduct as ProductType}
          isAdmin={false}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      ) : (
        <></>
      )}
      <div className="w-full md:right-0 flex justify-center md:justify-end items-center gap-3 mt-5">
        <DrawerRight direction="right">
          {!isAdded ? (
            <Button
              onClick={() => {
                addToBasket(userId, product!, quantity);
                setIsAdded(true);
              }}
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
            <DrawerBasket setIsAdded={setIsAdded} productId={productId} />
          </DrawerRightContent>
        </DrawerRight>

        <Button className="bg-zinc-400 w-28 hover:bg-zinc-500">구매하기</Button>
      </div>
      <hr className="mt-8" />
      {product ? <RecommandProducts category={product.category} productId={product.id} /> : <></>}
      <hr className="mt-10" />
      {product ? <ProductDetail product={product} /> : <></>}
    </div>
  );
}
