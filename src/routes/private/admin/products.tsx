import { useNavigate } from "react-router-dom";

export default function Products() {
  // 판매상품 리스트 목록
  const navigate = useNavigate();
  return (
    <>
      <h3>판매자 페이지</h3>
      <button onClick={() => navigate("/add-product")}>상품 등록 버튼</button>
    </>
  );
}
