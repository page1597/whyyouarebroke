import Products from "@/components/products";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Kpop() {
  // const [orderby, setOrderby] = useState<string>("createdAt");

  return (
    <>
      {/* <div className="flex gap-3">
        <Button onClick={() => setOrderby("createdAt")}>최신순</Button>
        <Button onClick={() => setOrderby("price")}>가격순</Button>
      </div> */}
      <Products category="k-pop" />
    </>
  );
}
