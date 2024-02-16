import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import { Button } from "@/components/ui/button";
import useDeleteProductMutation from "@/hooks/product/useDeleteProductMutation";
import useGetProduct from "@/hooks/product/useGetProduct";
import { ProductType } from "@/types/product";
import { useNavigate, useSearchParams } from "react-router-dom";

function Product() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const { loading, product } = useGetProduct(productId);
  const { deleteProduct } = useDeleteProductMutation();

  return (
    <div className="flex flex-col">
      {!loading && product ? (
        <>
          <ProductInfo product={product} isAdmin={true} />
          <div className="w-full right-0 flex justify-end items-center gap-3 mt-5">
            <Button
              id="delete_product"
              onClick={() => {
                if (confirm(`${product.id} 상품을 삭제하시겠습니까?`)) {
                  deleteProduct(product.id);
                }
              }}
              className="bg-zinc-500 w-28 hover:bg-zinc-600"
            >
              상품 삭제
            </Button>
            <Button
              id="edit_product"
              className="bg-zinc-400 w-28 hover:bg-zinc-500"
              onClick={() => navigate({ pathname: "/edit-product", search: `?id=${product.id}` })}
            >
              상품 정보 수정
            </Button>
          </div>
          <ProductDetail product={product as ProductType} />
        </>
      ) : (
        <>상품이 존재하지 않습니다.</>
      )}
    </div>
  );
}
export default Product;
