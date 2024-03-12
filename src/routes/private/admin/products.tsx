import ProductList from "@/components/productList";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Plus } from "lucide-react";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Products() {
  const navigate = useNavigate();
  const { width } = useWindowWidth();
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
        <Plus width={width > 640 ? 50 : 30} height={width > 640 ? 50 : 30} color="#555555" />
      </button>
      <ProductList />
    </>
  );
}
