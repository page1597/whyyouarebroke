import Products from "@/components/list/productList";
import { Helmet } from "react-helmet";

export default function Kpop() {
  return (
    <>
      <Helmet>
        <title>kpop</title>
      </Helmet>
      <Products category="k-pop" />
    </>
  );
}
