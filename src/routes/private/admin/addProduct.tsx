import AddProductForm from "@/components/addProductForm";

export default function AddProduct() {
  return (
    <div>
      <h3 className="md:text-xl text-lg">상품 등록</h3>
      <hr className="mt-5" />
      <div className="mt-8">
        <AddProductForm />
      </div>
    </div>
  );
}
