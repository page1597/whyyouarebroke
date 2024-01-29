import AddProductForm from "@/components/addProductForm";
import { DocumentData } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const { state }: DocumentData = useLocation();
  return (
    <div>
      <h3 className="text-xl">상품수정</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        <AddProductForm products={state} navigate={navigate} />
      </div>
    </div>
  );
}
