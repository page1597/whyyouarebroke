import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  DrawerLeft,
  DrawerLeftTrigger,
  DrawerLeftContent,
  DrawerLeftClose,
  DrawerLeftTitle,
} from "@/components/ui/drawerLeft";
import { DocsSidebarNavProps } from "@/types/navigation";

function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden md:inline-block w-40 h-full">
        {items.length
          ? items.map((item, index) => (
              <div
                key={index}
                className={cn("pb-5 text-zinc-900 text-base font-bold transition-all hover:translate-x-2")}
              >
                <Link to={item.href}>{item.title}</Link>
              </div>
            ))
          : null}
      </div>

      {/* 모바일 drawer 안에 있는 카테고리 사이드메뉴 */}
      <div className="md:hidden flex">
        <DrawerLeft direction="left">
          <DrawerLeftTrigger name="open drawer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </DrawerLeftTrigger>
          <div>
            <DrawerLeftContent>
              <DrawerLeftTitle>
                {items.length
                  ? items.map((item, index) => (
                      <DrawerLeftClose
                        key={index}
                        className={cn("pb-5 text-base font-bold transition-all hover:translate-x-2")}
                        onClick={() => navigate(item.href)}
                      >
                        {item.title}
                      </DrawerLeftClose>
                    ))
                  : null}
              </DrawerLeftTitle>
            </DrawerLeftContent>
          </div>
        </DrawerLeft>
      </div>
    </>
  );
}
export default DocsSidebarNav;
