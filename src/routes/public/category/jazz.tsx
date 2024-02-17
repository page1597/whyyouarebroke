import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function Jazz() {
  return (
    <>
      <Helmet>
        <title>jazz</title>
      </Helmet>
      <Products category="jazz" />
    </>
  );
}
export default Jazz;
