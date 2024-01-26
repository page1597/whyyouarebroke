import { UserContextType } from "@/context/userContext";
import { useUser } from "@/hooks/useAuth";
import { UserInfoType } from "@/types";

export default function Products() {
  // 구매상품 리스트 목록
  const { user } = useUser();
  return (
    <h3 className="text-xl">
      회원 & 비회원 상품 목록 페이지
      <button onClick={() => console.log(user)}>user 확인</button>
    </h3>
  );
}
