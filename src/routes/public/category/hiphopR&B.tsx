import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function HipHopRandB() {
  return (
    <>
      <Helmet>
        <title>hiphopR&B</title>
      </Helmet>
      <Products category="hip hop/r&b" />
    </>
  );
}
export default HipHopRandB;
