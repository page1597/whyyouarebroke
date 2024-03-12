import OrderList from "@/components/orderList";
import { Helmet } from "react-helmet";

export default function Order() {
  return (
    <>
      <Helmet>
        <title>주문조회</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">주문 조회</h3>
      <OrderList isAdmin={true} />
    </>
  );
}
