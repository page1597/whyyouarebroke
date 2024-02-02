import AddProductForm from "@/components/addProductForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-xl">상품 등록</h3>

      <hr className="mt-5" />
      <div className="mt-8">
        <AddProductForm navigate={navigate} />
      </div>
    </div>
  );
}
