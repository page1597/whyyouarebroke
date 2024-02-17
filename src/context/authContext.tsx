import { UserInfoType } from "@/types/user";
import { createContext } from "react";

export const AuthContext = createContext<UserInfoType | null>(null);
