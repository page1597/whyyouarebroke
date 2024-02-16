import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

function MyPage() {
  const userInfo = useContext(AuthContext);
  return (
    <>
      <h3 className="text-xl">마이페이지</h3>
      {userInfo?.name}님 안녕하세요!
    </>
  );
}
export default MyPage;
