import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

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

export type HeaderNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export type UserInfoType = {
  email: string?;
  // id: string?;
  name: string?;
  type: string?;
  // nickname: string;
  // image: string;
  // greeting: string;
};
// 회원가입 폼 타입
export type UserSignUpType = {
  type: string;
  // id: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  // nickname: string;
  // image: string;
  // greeting: string;
};

export type ProductType = {
  id: string; // 고유 아이디
  category: string;
  name: string;
  price: number;
  stock: number;
  image: any;
  description: string;
  artist: string?;
  label: string?;
  released: string?;
  format: string?;
  createdAt: number;
};

export type BasketProduct = ProductType & {
  quantity: number;
};

// 장바구니 속성 중 description 항목을 제외함
export type BasketProductType = Pick<
  BasketProduct,
  "id" | "name" | "price" | "format" | "stock" | "quantity" | "image"
>;

export type OrderInfoType = {
  merchant_uid: string; // 주문번호
  amount: number;
  name: string;
  products: BasketProductType[];
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
};
