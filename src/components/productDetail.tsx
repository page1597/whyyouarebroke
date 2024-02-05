import { DocumentData } from "firebase/firestore";

export default function ProductDetail({ product }: { product: DocumentData }) {
  return (
    <div>
      <div className="flex justify-center mt-10 ">
        <div className="text-zinc-700">상품 상세</div>
      </div>
      <div className="my-16 whitespace-pre-line">{product.description}</div>
    </div>
  );
}
