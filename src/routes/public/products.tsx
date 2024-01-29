import { useNavigate } from "react-router-dom";

export default function Products() {
  // 구매상품 리스트 목록
  const navigate = useNavigate();
  return (
    <h3 className="text-xl">
      회원 & 비회원 상품 목록 페이지
      <button onClick={() => navigate("/add-product")}>test</button>
    </h3>
  );
}
