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
  startAfter,
  where,
  endBefore,
  startAt,
  endAt,
} from "firebase/firestore";
import { deleteObject, getBlob, getDownloadURL, getStorage, list, listAll, ref, uploadBytes } from "firebase/storage";

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
      console.log(userCredential);

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

//Email 로그인
export async function logIn(email: string, password: string) {
  // try {
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  console.log(userCredential);

  // navigate("/");
  // alert("로그인 되었습니다.");

  return userCredential;
  // } catch (error) {
  //   console.error("로그인 에러:", error);
  //   alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  //   return error;
  // }
}

export async function googleSignUp(navigate: NavigateFunction, type: string) {
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
    console.log(userCredential);

    // 로그아웃 후 로그인 페이지로 이동
    await signOut(firebaseAuth);
    navigate("/login");
  } catch (error) {
    console.error("구글 회원가입 에러:", error);
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

export async function logOut() {
  await signOut(firebaseAuth);
}

export async function getUser(uid: string): Promise<DocumentData | undefined> {
  const result = await getDoc(doc(db, "users", uid));
  console.log(result.data());
  return result.data();
}

export function onUserStateChange(callback: any) {
  onAuthStateChanged(firebaseAuth, (user) => {
    callback(user);
  });
}
export async function getProducts(
  category: string | null,
  orderby: string | null,
  limitParam: number | null,
  pageParam: number | null,
  searchValue: string | null
  // minPrice: number | null,
  // maxPrice: number | null
) {
  let finalQuery = query(collection(db, "products"));

  console.log(category, orderby, limitParam, pageParam, searchValue);

  if (category) {
    finalQuery = query(finalQuery, where("category", "==", category));
  }
  if (orderby) {
    finalQuery = query(finalQuery, orderBy(orderby, "desc"));
  }
  if (pageParam) {
    finalQuery = query(finalQuery, startAfter(pageParam));
  }
  if (limitParam) {
    finalQuery = query(finalQuery, limit(limitParam));
  }
  if (searchValue) {
    const searchArray = searchValue.toLocaleLowerCase().split(" ");
    finalQuery = query(finalQuery, where("searchArray", "array-contains-any", searchArray));
  }
  // if (minPrice) {
  //   finalQuery = query(finalQuery, where("price", ">=", minPrice));
  // }
  // if (maxPrice) {
  //   finalQuery = query(finalQuery, where("price", "<=", maxPrice));
  // }

  // console.log(finalQuery);

  const querySnapshot = await getDocs(finalQuery);
  const products: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    products.push(doc.data() as DocumentData);
  });

  console.log("products:", products);
  return products;
}
// 모든 제품 가져오기
// 정렬 기본값: 최신순
// export async function getProducts(
//   orderby: string = "createdAt",
//   limitParam: number = 12,
//   pageParam: number | null = null,
//   searchValue: string = ""
// ) {
//   const searchArray = Array.from(searchValue);

//   const baseQuery = query(collection(db, "products"), orderBy(orderby, "desc"));

//   let finalQuery: any = baseQuery;

//   if (pageParam) {
//     finalQuery = query(finalQuery, startAfter(pageParam), limit(limitParam));
//   } else {
//     // pageParam이 null인 경우에는 처음 로드할 때
//     finalQuery = query(finalQuery, limit(limitParam));
//   }

//   if (searchValue !== "") {
//     finalQuery = query(finalQuery, where("nameArray", "array-contains-any", searchArray));
//   }

//   const querySnapshot = await getDocs(finalQuery);
//   const products: DocumentData[] = [];

//   querySnapshot.forEach((doc) => {
//     products.push(doc.data() as DocumentData);
//   });

//   return products;
// }
// export async function getCategoryProducts(
//   category: string,
//   orderby: string,
//   limitParam: number | null,
//   pageParam: string | null
// ) {
//   const baseQuery = query(collection(db, "products"), where("category", "==", category), orderBy(orderby, "desc"));
//   let finalQuery = baseQuery;
//   if (pageParam) {
//     const paginatedQuery = query(baseQuery, startAfter(pageParam));
//     finalQuery = limitParam ? query(paginatedQuery, limit(limitParam)) : paginatedQuery;
//   } else {
//     finalQuery = limitParam ? query(baseQuery, limit(limitParam)) : baseQuery;
//   }

//   const querySnapshot = await getDocs(finalQuery);
//   const products: DocumentData[] = [];

//   querySnapshot.forEach((doc) => {
//     products.push(doc.data());
//   });

//   console.log(products);
//   return products;
// }

export async function getSearchProducts(searchValue: string) {
  const searchArray = Array.from(searchValue);
  const q = query(collection(db, "products"), where("searchArray", "array-contains-any", searchArray));

  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => doc.data());
  return results;
}

export async function getProduct(productId: string) {
  const q = query(collection(db, "products"), where("id", "==", productId));
  const querySnapshot = await getDocs(q);

  let product = null;
  if (querySnapshot.docs.length > 0) {
    const doc = querySnapshot.docs[0];
    product = doc.data();
  }

  return product;
}

async function blobUriToBlob(blobUri: string) {
  try {
    // Blob URI에서 데이터를 가져옴
    const response = await fetch(blobUri);

    // Blob으로 변환
    const blob = await response.blob();

    return blob;
  } catch (error) {
    console.error("Error converting Blob URI to Blob:", error);
    throw error;
  }
}

export async function addProduct(product: ProductType) {
  const storage = getStorage();
  const productRef = doc(db, "products", product.id);

  // const searchArray = [...Array.from(product.name), ...Array.from(product.artist)];
  const subStringLength = 3; // 나누고자 하는 서브스트링의 길이

  // const searchArray = [];
  // for (let i = 0; i < product.name.length; i += subStringLength) {
  //   const subString = product.name.substring(i, i + subStringLength);
  //   searchArray.push(subString);
  // }
  // try {
  await setDoc(productRef, {
    id: product.id,
    category: product.category,
    name: product.name,
    searchArray: product.name.toLocaleLowerCase().split(" "),
    price: product.price,
    stock: product.stock,
    description: product.description,
    artist: product.artist,
    label: product.label,
    released: product.released,
    format: product.format,
    createdAt: product.createdAt,
  });

  const images: string[] = [];

  // 스토리지에 이미지 업로드
  await Promise.all(
    product.image.map(async (image: string, index: number) => {
      const imageRef = ref(storage, `products/${product.id}/image${index}`);
      const blob = await blobUriToBlob(image);

      try {
        const snapshot = await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(downloadURL);
        images.push(downloadURL);
      } catch (e) {
        console.error(`${index}번째 이미지 업로드 실패:`, e);
      }
    })
  );
  // docs에 이미지 url 업로드
  await updateDoc(productRef, { image: images });
  // } catch (error) {
  //   console.error("Error adding product:", error);
  // }
}

export async function getPrevImagesURL(id: string, images: string[]): Promise<string[]> {
  const storage = getStorage();
  const prevImages: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const imageRef = ref(storage, `products/${id}/image${i}`);
    const result = await getBlob(imageRef);
    const blobURL = URL.createObjectURL(result);
    prevImages.push(blobURL);
  }

  return prevImages;
}

export async function deleteProduct(id: string) {
  const storage = getStorage();

  // 상품 데이터 삭제
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Error deleting product:", error);
    return;
  }

  // 이미지 삭제
  const productStorageRef = ref(storage, `products/${id}`);
  try {
    // 폴더 내 파일 목록 가져오기
    const listResult = await list(productStorageRef);
    const promises = listResult.items.map(async (item) => {
      await deleteObject(item);
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Error deleting product images:", error);
  }
}
