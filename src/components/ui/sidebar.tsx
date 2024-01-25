import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export default function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  return (
    <div className="w-40 h-full">
      {items.length
        ? items.map((item, index) => (
            <div key={index} className={cn("pb-5 text-base font-bold")}>
              <Link to={item.href}>{item.title}</Link>
            </div>
          ))
        : null}
    </div>
  );
}
