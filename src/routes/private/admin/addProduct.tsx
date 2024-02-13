import AddProductForm from "@/components/addProductForm";

export default function AddProduct() {
  return (
    <div>
      <h3 className="text-xl">상품 등록</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        <AddProductForm />
      </div>
    </div>
  );
}
