import { useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "@/context/userContext";
import { getUser } from "@/firebase";

// 유저 정보 저장
export function useUser() {
  return useContext(UserContext);
}

var isLoggedIn = false;
// 로그인 확인
export function useAuth() {
  //  여기서 React-Query를 이용해 서버로부터 data fetching 수행

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn = true;
      console.log("isLoggedIn", isLoggedIn);
    }
  });
  console.log("useAuth isLoggedIn", isLoggedIn);
  return isLoggedIn;
}

var uid: string = "";
var isAdmin = false;
// 관리자 확인
export async function useAuthAdmin(): Promise<boolean> {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid);
      uid = user.uid;
    }
  });
  try {
    console.log(uid);
    const loggedInUser = await getUser(uid);
    console.log("loggedInUser?.type", loggedInUser?.type);
    if (loggedInUser?.type == "관리자") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  } catch (e) {
    console.log("관리자 확인 에러:", e);
  }
  console.log("isAdmin: ", isAdmin);
  return isAdmin;
}
