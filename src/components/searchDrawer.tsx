import { Search } from "lucide-react";
import SearchProducts from "./searchProducts";
import { DrawerRight, DrawerRightTrigger, DrawerRightContent } from "./ui/drawerRight";

export default function SearchDrawer() {
  return (
    <DrawerRight direction="right">
      <DrawerRightTrigger name="search">
        <Search width={24} height={24} />
      </DrawerRightTrigger>
      <DrawerRightContent>
        <SearchProducts />
      </DrawerRightContent>
    </DrawerRight>
  );
}
