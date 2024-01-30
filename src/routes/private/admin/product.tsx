import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/firebase";
import { ProductType } from "@/types";
import { DocumentData } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const { state }: DocumentData = useLocation();

  const product = state as ProductType;

  return (
    <div className="flex flex-col ml-10">
      <div className="text-xl text-zinc-800">
        [{product.format}] {product.name}
      </div>

      <div className="flex flex-row mt-8">
        <div className="w-80 h-80">
          {product.image ? (
            <img src={product.image[0]} alt={product.name} width={320} height={320} />
          ) : (
            <div className="w-60 h-60 bg-zinc-100" />
          )}
        </div>
        <div className="ml-6 flex-grow">
          <hr />
          <div className="grid grid-cols-402 text-xl text-zinc-900 my-3 ml-4">
            <h3>상품명</h3>
            <h3>
              [{product.format}] {product.name}
            </h3>
          </div>
          <hr />
          <div className="grid grid-cols-402 mt-3 ml-4 gap-1">
            <h4 className="text-zinc-600 text-base font-bold">판매가</h4>
            <h4 className="text-zinc-600 text-base font-bold">{product.price}</h4>
            <h5 className="text-zinc-900 text-base mt-2">재고</h5>
            <h5 className="text-zinc-500 text-base mt-2">{product.stock}</h5>
            <h5 className="text-zinc-900 text-base">Artist</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.artist}</h5>
            <h5 className="text-zinc-900 text-base">Label</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.label}</h5>
            <h5 className="text-zinc-900 text-base">Released</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.released}</h5>
            <h5 className="text-zinc-900 text-base">Format</h5>
            <h5 className="text-zinc-500 text-base font-light">{product.format}</h5>
          </div>
          {/* <div className="bg-zinc-100 w-full p-5 mt-5 text-lg font-normal text-zinc-700">
            [{product.format}] {product.name}
          </div> */}
        </div>
      </div>
      <div className="w-full right-0 flex justify-end items-center gap-3 mt-5">
        <Button
          onClick={async () => {
            await deleteProduct(product.id);
            alert("상품이 삭제되었습니다.");
            navigate("/");
          }}
          className="bg-zinc-500 w-28 hover:bg-zinc-600"
        >
          상품 삭제
        </Button>
        <Button className="bg-zinc-400 w-28 hover:bg-zinc-500" onClick={() => navigate("/edit-product", { state })}>
          상품 정보 수정
        </Button>
      </div>
    </div>
  );
}
