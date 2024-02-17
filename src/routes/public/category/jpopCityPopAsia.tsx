import Products from "@/components/productList";
import { Helmet } from "react-helmet";

function JPopCityPopAsia() {
  return (
    <>
      <Helmet>
        <title>jpopCityPopAsia</title>
      </Helmet>
      <Products category="j-pop/city pop/asia" />
    </>
  );
}
export default JPopCityPopAsia;
