import Products from "@/components/list/productList";
import { Helmet } from "react-helmet";

export default function Merchandise() {
  return (
    <>
      <Helmet>
        <title>merchandise</title>
      </Helmet>
      <Products category="merchandise" />
    </>
  );
}
