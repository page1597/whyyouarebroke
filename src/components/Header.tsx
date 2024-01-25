import { HeaderNavItem } from "@/types";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface HeaderNavProps {
  items: HeaderNavItem[];
}

export function Header({ items }: HeaderNavProps) {
  return (
    <>
      <div className="hidden md:flex bg-zinc-700 justify-end py-1.5 items-center px-3">
        {items.length
          ? items.map((item, index) => (
              <div key={index} className="text-white mx-2 text-sm">
                <Link to={item.href}>{item.title}</Link>
              </div>
            ))
          : null}
        <Input />
      </div>

      {/* 모바일 헤더(로고까지 포함) */}
      <div className="md:hidden">
        <div className="flex bg-zinc-700 justify-center py-1.5 items-center px-3">
          {items.length
            ? items.map((item, index) => (
                <div key={index} className="text-white mx-2 text-sm">
                  <Link to={item.href}>{item.title}</Link>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
