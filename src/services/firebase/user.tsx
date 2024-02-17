import { UserSignUpType } from "@/types/user";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseAuth } from "../firebase";
import { NavigateFunction } from "react-router-dom";

// Email 회원가입
export async function fbSignUp(user: UserSignUpType, navigate: NavigateFunction) {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, user.email, user.password!);

    try {
      const updated = await updateProfile(userCredential.user, { displayName: user.name });

      try {
        const uid = userCredential.user.uid;
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
          email: user.email,
          type: user.type,
          name: user.name,
        });
      } catch (editProduct) {
        console.error("사용자 데이터 저장 에러:", editProduct);
      }

      alert("회원가입 되었습니다.");

      // 로그아웃 후 로그인 페이지로 이동
      await signOut(firebaseAuth);
      navigate("/login");
    } catch (e) {
      console.error("프로필 업데이트 에러:", e);
    }
  } catch (e) {
    console.error("회원가입 에러:", e);
  }
}

// Email 로그인
export async function fbLogIn(email: string, password: string) {
  // const userCredential =
  // console.log(email, password);
  await signInWithEmailAndPassword(firebaseAuth, email, password);
  // console.log("console");
  // return userCredential;
}

export async function fbGoogleSignUp(navigate: NavigateFunction, type: string) {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    try {
      const uid = userCredential.user.uid;
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        email: userCredential.user.email,
        type: type,
        name: userCredential.user.displayName,
      });
    } catch (error) {
      console.error("사용자 데이터 저장 에러:", error);
    }

    alert("회원가입 되었습니다.");

    // 로그아웃 후 로그인 페이지로 이동
    await signOut(firebaseAuth);
    navigate("/login");
  } catch (error) {
    console.error("구글 회원가입 에러:", error);
  }
}

export async function fbGoogleLogIn() {
  const provider = new GoogleAuthProvider(); // provider 구글 설정
  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    alert("로그인 되었습니다.");
    return userCredential;
  } catch (e) {
    alert("로그인에 실패하였습니다.");
    return e;
  }
}

// 로그아웃
export async function fbLogOut() {
  await signOut(firebaseAuth);
}

export async function fbGetUser(uid: string): Promise<DocumentData | undefined> {
  const result = await getDoc(doc(db, "users", uid));
  return result.data();
}

// export function onUserStateChange(callback: any) {
//   onAuthStateChanged(firebaseAuth, (user) => {
//     callback(user);
//   });
// }
