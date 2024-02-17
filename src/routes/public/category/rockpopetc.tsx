import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function RockPopEtc() {
  return (
    <>
      <Helmet>
        <title>rock/pop/etc</title>
      </Helmet>
      <Products category="rock/pop/etc" />
    </>
  );
}
export default RockPopEtc;
