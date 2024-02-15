import useAllProducts from "@/hooks/product/useGetAllProducts";
import ProductListWithCarousel from "@/components/productListWithCarousel";

// 로딩 느린거
export default function Products() {
  const { productList } = useAllProducts();

  return (
    <div className="ml-5 text-zinc-900">
      {productList ? <ProductListWithCarousel productList={productList} /> : <p>상품이 존재하지 않습니다.</p>}
    </div>
  );
}
