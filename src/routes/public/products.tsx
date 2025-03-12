import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import ProductListWithCarousel from "@/components/list/productListWithCarousel";
import { Helmet } from "react-helmet";
import ProductListWithCarouselSkeleton from "@/components/skeleton/productListWithCarouselSkeleton";
import usePreloadImages from "@/hooks/product/usePreloadImages";

export default function Products() {
  const { isLoading, productList } = useGetAllProducts();
  const { isImagesLoaded } = usePreloadImages(productList, isLoading);
  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
      </Helmet>
      <div className="text-zinc-900">
        {isLoading || !isImagesLoaded ? (
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
