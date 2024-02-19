import Products from "@/components/productList";
import { Helmet } from "react-helmet";

export default function HipHopRandB() {
  return (
    <>
      <Helmet>
        <title>hiphopR&B</title>
      </Helmet>
      <Products category="hip hop/r&b" />
    </>
  );
}
