import Products from "@/components/list/productList";
import { Helmet } from "react-helmet";

export default function RockPopEtc() {
  return (
    <>
      <Helmet>
        <title>rock/pop/etc</title>
      </Helmet>
      <Products category="rock/pop/etc" />
    </>
  );
}
