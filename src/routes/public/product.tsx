import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import RecommandProducts from "@/components/recommandProducts";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types";
import { DocumentData } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
// 구매자가 보는 상품 상세 페이지
export default function Product() {
  const navigate = useNavigate();
  const { state }: DocumentData = useLocation();

  const product = state as ProductType;

  return (
    <div className="flex flex-col ml-10">
      <ProductInfo product={product} isAdmin={false} />
      {/* 버튼 영역 */}
      <div className="w-full right-0 flex justify-end items-center gap-3 mt-5">
        <Button className="bg-zinc-0 border border-zinc-500 text-zinc-900 w-28 hover:bg-zinc-100">장바구니 추가</Button>
        <Button className="bg-zinc-400 w-28 hover:bg-zinc-500" onClick={() => navigate("/edit-product", { state })}>
          구매하기
        </Button>
      </div>
      <hr />
      <RecommandProducts category={state.category} productName={product.name} />
      <hr className="mt-10" />
      <ProductDetail product={product} />
    </div>
  );
}
