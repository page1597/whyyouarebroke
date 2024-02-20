import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";

export default function MyPage() {
  const userInfo = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">마이페이지</h3>
      {userInfo?.name}님 안녕하세요!
    </>
  );
}
