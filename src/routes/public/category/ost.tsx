import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function Ost() {
  return (
    <>
      <Helmet>
        <title>ost</title>
      </Helmet>
      <Products category="ost" />
    </>
  );
}
export default Ost;
