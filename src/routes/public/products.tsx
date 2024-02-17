import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import ProductListWithCarousel from "@/components/productListWithCarousel";
import Alert from "@/components/alert";

function Products() {
  const { loading, productList } = useGetAllProducts();

  return (
    <>
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
