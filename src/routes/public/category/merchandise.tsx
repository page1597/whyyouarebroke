import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function Merchandise() {
  return (
    <>
      <Helmet>
        <title>merchandise</title>
      </Helmet>
      <Products category="merchandise" />
    </>
  );
}
export default Merchandise;
