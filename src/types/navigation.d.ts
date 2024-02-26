import { Dispatch, SetStateAction } from "react";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
};

export type DocsSidebarNavProps = {
  items: SidebarNavItem[];
};

export type HeaderNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
};
export type HeaderNavProps = {
  items: HeaderNavItem[];
  basketLength: number;
};
