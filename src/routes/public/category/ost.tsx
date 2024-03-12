import Products from "@/components/list/productList";
import { Helmet } from "react-helmet";

export default function Ost() {
  return (
    <>
      <Helmet>
        <title>ost</title>
      </Helmet>
      <Products category="ost" />
    </>
  );
}
