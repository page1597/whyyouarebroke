import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import ProductListWithCarousel from "@/components/list/productListWithCarousel";
import { Helmet } from "react-helmet";
import ProductListWithCarouselSkeleton from "@/components/skeleton/productListWithCarouselSkeleton";

export default function Products() {
  const { isLoading, productList } = useGetAllProducts();
  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
      </Helmet>
      <div className="text-zinc-900">
        {isLoading ? (
          <ProductListWithCarouselSkeleton />
        ) : productList ? (
          <ProductListWithCarousel productList={productList} />
        ) : (
          <p>상품이 존재하지 않습니다.</p>
        )}
      </div>
    </>
  );
}
