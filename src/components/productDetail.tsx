import { DocumentData } from "firebase/firestore";
import React from "react";

export default function ProductDetail({ product }: { product: DocumentData }) {
  return (
    <div>
      <div className="flex justify-center mt-12">
        <div className="text-zinc-700">상품 상세</div>
      </div>
      <div className="mt-20">{product.description}</div>
    </div>
  );
}
