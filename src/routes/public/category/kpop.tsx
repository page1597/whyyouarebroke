import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function Kpop() {
  return (
    <>
      <Helmet>
        <title>kpop</title>
      </Helmet>
      <Products category="k-pop" />
    </>
  );
}
export default Kpop;
