import BasketList from "@/components/basketList";
import { AuthContext } from "@/context/authContext";
import { getBasket } from "@/services/basket";
import { useContext, useEffect, useState } from "react";

export default function Basket() {
  const userInfo = useContext(AuthContext);
  const [basket, setBasket] = useState([]); // 장바구니 상태를 저장할 상태 변수 추가

  useEffect(() => {
    const fetchBasket = async () => {
      const userId = userInfo ? userInfo.id : null;
      const fetchedBasket = await getBasket(userId); // getBasket 함수를 비동기로 호출하여 장바구니 데이터 가져오기
      setBasket(fetchedBasket); // 가져온 장바구니 데이터를 상태 변수에 저장
    };

    fetchBasket(); // useEffect 내에서 비동기 함수 호출
  }, [userInfo]); // userInfo가 변경될 때마다 호출

  return (
    <h3 className="text-xl">
      장바구니 ({basket ? basket.length : 0})<BasketList basket={basket} />
    </h3>
  );
}
