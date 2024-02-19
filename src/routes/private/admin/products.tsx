import ProductList from "@/components/productList";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Products() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>whyyouarebroke</title>
      </Helmet>
      <button
        id="upload_product"
        title="상품 등록"
        className="fixed md:right-10 md:bottom-10 right-6 bottom-6 bg-zinc-200 rounded-full p-2 z-10"
        onClick={() => navigate("/add-product")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555555"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-14 md:h-14"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <ProductList />
    </>
  );
}
