import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import ProductListWithCarousel from "@/components/productListWithCarousel";
import { Helmet } from "react-helmet";
export default function Products() {
  const { isLoading, productList } = useGetAllProducts();
  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
      </Helmet>
      <div className="ml-5 text-zinc-900">
        {isLoading ? (
          <p>Loading...</p>
        ) : productList ? (
          <ProductListWithCarousel productList={productList} />
        ) : (
          <p>상품이 존재하지 않습니다.</p>
        )}
      </div>
    </>
  );
}
