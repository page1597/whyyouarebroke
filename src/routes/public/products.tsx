import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import ProductListWithCarousel from "@/components/productListWithCarousel";
import { Helmet } from "react-helmet";
function Products() {
  const { loading, productList } = useGetAllProducts();

  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
      </Helmet>
      <div className="ml-5 text-zinc-900">
        {loading ? (
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
export default Products;
