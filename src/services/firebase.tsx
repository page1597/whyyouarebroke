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
  collection,
  query,
  getDocs,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { deleteObject, getBlob, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

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

// 모든 제품 가져오기
//최신 순으로 정렬합니다
export async function getProducts() {
  // const image = collection(db, "products"); // 흠..?
  let products: DocumentData[] = [];
  // const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(15));

  // const documentSnapshots = await getDocs(q);
  // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  // console.log("last", lastVisible);
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const result = await getDocs(q);

  result.forEach((doc) => {
    products.push(doc.data());
  });
  return products;
}

export async function addProduct(product: ProductType) {
  console.log(product);
  const storage = getStorage();
  // await addDoc(collection(db, "products")
  // await setDoc(doc(db, "products", product.name)
  try {
    await setDoc(doc(db, "products", product.id), {
      id: product.id,
      category: product.category,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      artist: product.artist,
      label: product.label,
      released: product.released,
      format: product.format,
      createdAt: product.createdAt,
    });
    // await setDoc(productRef, product);
    const images: string[] = [];

    //data:
    await product.image.map((image: string, index: string) => {
      const imageRef = ref(storage, `products/${product.id}/image${index}`);
      console.log(image, typeof image);
      uploadString(imageRef, image, "data_url").then(async (snapshot: any) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        images.push(downloadURL);
        await updateDoc(doc(db, "products", product.id), {
          image: images,
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getPrevImagesURL(id: string, images: string[]) {
  // productRef.id으로 해야되는디
  const storage = getStorage();
  let prevImages: string[] = [];
  let dataUrlList: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const imageRef = ref(storage, `products/${id}/image${i}`);
    const result = await getBlob(imageRef);
    const blob_url = URL.createObjectURL(result);

    let fileReader = new FileReader();
    fileReader.onload = () => {
      dataUrlList.push(fileReader.result as string);
    };
    prevImages.push(blob_url);
    fileReader.readAsDataURL(result);
  }
  return [prevImages, dataUrlList];
}

export async function deleteProduct(id: string) {
  const storage = getStorage();
  const productRef = ref(storage, `products/${id}`);
  // doc(db, "products", product.id)
  try {
    await deleteDoc(doc(db, "products", id)); // 고유 아이디
  } catch (e) {
    console.log("e1:", e);
    try {
      await deleteObject(productRef);
    } catch (e) {
      console.log("e2", e);
    }
  }
}
