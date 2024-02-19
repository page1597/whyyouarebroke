import Products from "@/components/productList";
import { Helmet } from "react-helmet";

export default function JPopCityPopAsia() {
  return (
    <>
      <Helmet>
        <title>jpopCityPopAsia</title>
      </Helmet>
      <Products category="j-pop/city pop/asia" />
    </>
  );
}
