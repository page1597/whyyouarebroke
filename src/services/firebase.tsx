// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { ProductType, UserSignUpType } from "../types";
import {
  getFirestore,
  setDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // 랜덤 식별자를 생성해주는 라이브러리

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "commerce-fee29.firebaseapp.com",
  projectId: "commerce-fee29",
  storageBucket: "commerce-fee29.appspot.com",
  messagingSenderId: "15783501222",
  appId: "1:15783501222:web:0c81c141fefd0bf5ecc367",
  measurementId: "G-FD0CJWB3K4",
};
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const db = getFirestore(app);
//Email 회원가입
export async function signUp(user: UserSignUpType, navigate: NavigateFunction) {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, user.email, user.password!);
    try {
      const updated = await updateProfile(userCredential.user, { displayName: user.name });
      console.log(updated);
      try {
        const uid = userCredential.user.uid;
        const userRef = doc(db, "users", uid); // 파이어베이스 자동생성 유저 고유 아이디
        await setDoc(userRef, {
          email: user.email,
          type: user.type,
          name: user.name,
        });
      } catch (e) {
        console.log(e);
      }

      alert("회원가입 되었습니다.");
      console.log(userCredential);
      signOut(firebaseAuth).then(() => navigate("/login")); // 동작 어색함..
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}
//Email 로그인
export async function logIn(email: string, password: string, navigate: NavigateFunction) {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    console.log(userCredential);

    navigate("/");
    alert("로그인 되었습니다.");

    return userCredential;
  } catch (e) {
    console.log(e);
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    return e;
  }
}

export async function googleSignUp(navigate: NavigateFunction, type: string) {
  const provider = new GoogleAuthProvider(); // provider 구글 설정
  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    try {
      const uid = userCredential.user.uid;
      const userRef = doc(db, "users", uid); // 파이어베이스 자동생성 유저 고유 아이디
      await setDoc(userRef, {
        email: userCredential.user.email,
        type: type,
        name: userCredential.user.displayName,
      });
    } catch (e) {
      console.log(e);
    }
    alert("회원가입 되었습니다.");
    console.log(userCredential);
    signOut(firebaseAuth).then(() => navigate("/login")); // 동작 어색함..
  } catch (e) {
    console.log(e);
  }
}

export async function googleLogIn(navigate: NavigateFunction) {
  const provider = new GoogleAuthProvider(); // provider 구글 설정
  try {
    const userCredential = await signInWithPopup(firebaseAuth, provider);
    console.log(userCredential);
    navigate("/");
    alert("로그인 되었습니다.");
    return userCredential;
  } catch (e) {
    console.log(e);
    alert("로그인에 실패하였습니다.");
    return e;
  }
}

export async function logOut(navigate: NavigateFunction) {
  try {
    const response = await signOut(firebaseAuth);
    alert("로그아웃 되었습니다.");
    console.log("로그아웃 되었습니다.");
    console.log(response);
    navigate("/");
  } catch (e) {
    console.log(e);
  }
}
export async function getUser(uid: string): Promise<DocumentData | undefined> {
  const result = await getDoc(doc(db, "users", uid));
  console.log(result.data());
  return result.data();
}
// export async function getUser

export function onUserStateChange(callback: any) {
  onAuthStateChanged(firebaseAuth, (user) => {
    callback(user);
  });
}

export async function addProduct(product: ProductType, navigate: NavigateFunction) {
  console.log(product);
  const storage = getStorage();

  try {
    const productRef = await addDoc(collection(db, "products"), {
      category: product.category,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      artist: product.artist,
      label: product.label,
      released: product.released,
      format: product.format,
    });
    // await setDoc(productRef, product);
    const images: string[] = [];

    await product.image.map((image: string, index: string) => {
      const imageRef = ref(storage, `products/${productRef.id}/image${index}`);
      console.log(image, typeof image);
      uploadString(imageRef, image, "data_url").then(async (snapshot: any) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        images.push(downloadURL);
        await updateDoc(doc(db, "products", productRef.id), {
          image: images,
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
}
