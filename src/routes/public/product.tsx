import DrawerBasket from "@/components/drawerBasket";
import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import RecommandProducts from "@/components/recommandProducts";
import { Button } from "@/components/ui/button";
import { DrawerRight, DrawerRightContent, DrawerRightTrigger } from "@/components/ui/drawerRight";
import { BasketContext } from "@/context/basketContext";
import { getProduct } from "@/services/firebase";
import { BasketProductType, ProductType } from "@/types";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// 구매자가 보는 상품 상세 페이지
export default function Product() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState<ProductType | undefined>();

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
    console.log(result);
    setProduct(result as ProductType);
  }

  const contextValue = useContext(BasketContext);
  if (!contextValue) {
    throw new Error("BasketContext를 찾을 수 없습니다.");
  }
  const { basket, setBasket } = contextValue;
  // const productQuantity = basket?.find((item) => item.id === product?.id)?.quantity || 1;
  const [quantity, setQuantity] = useState(1); // quantity (수량)
  const basketProduct: BasketProductType = {
    ...(product as ProductType),
    quantity: quantity, // 장바구니 형태의 product로 변경. (수량 항목 추가)
  };

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    console.log("quantity is changed");
    // product가 바뀐건 맞는데, 같은 값의 quantity가 바뀌었을때를 어떻게 처리하지
    if (basket) {
      const isProductInBasket = basket.some((product) => basketProduct.id === product.id);
      setIsAdded(isProductInBasket);
    }
  }, [product, quantity]);

  useEffect(() => {
    console.log("changed");
    setIsAdded(false);
  }, [quantity]);

  useEffect(() => {
    console.log("isAdded", isAdded);
  }, [isAdded]);

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
    <div className="flex flex-col">
      {product ? (
        <ProductInfo
          product={basketProduct as ProductType}
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
