import OrderList from "@/components/orderList";
import { Helmet } from "react-helmet";

export default function Orders() {
  return (
    <>
      <Helmet>
        <title>주문조회</title>
      </Helmet>
      <h3 className="md:text-xl text-lg">주문조회</h3>
      <OrderList isAdmin={false} />
    </>
  );
}
