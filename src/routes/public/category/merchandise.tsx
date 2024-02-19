import Products from "@/components/productList";
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
