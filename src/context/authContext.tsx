import { createContext } from "react";
import { UserInfoType } from "@/types";

export const AuthContext = createContext<UserInfoType | null>(null);
