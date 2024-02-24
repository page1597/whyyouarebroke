import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from ".";
import { deleteObject, getBlob, getDownloadURL, getStorage, list, ref, uploadBytes } from "firebase/storage";
import { ProductType } from "@/types/product";
import { blobUriToBlob, shuffleArray } from "@/lib/utils";

export async function fbGetProducts(
  category: string | null,
  searchValue: string | null,
  priceRange: { minPrice: number; maxPrice: number } | null,
  orderby: string | null,
  pageParam: number | null,
  limitParam: number | null
) {
  let finalQuery = query(collection(db, "products"));
  // console.log(category, orderby, limitParam, pageParam, searchValue, priceRange);

  if (category) {
    finalQuery = query(finalQuery, where("category", "==", category));
  }
  if (searchValue) {
    const searchArray = searchValue.toLocaleLowerCase().split(" ");
    finalQuery = query(finalQuery, where("searchArray", "array-contains-any", searchArray));
  }
  if (priceRange && priceRange.minPrice !== null && priceRange.maxPrice !== null) {
    finalQuery = query(
      finalQuery,
      where("price", ">=", priceRange.minPrice),
      where("price", "<=", priceRange.maxPrice)
    );
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
  const querySnapshot = await getDocs(finalQuery);
  const products: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    products.push(doc.data() as DocumentData);
  });
  return products;
}

export async function fbGetRandomProducts(productId: string, category: string, limitParam: number) {
  const collectionRef = collection(db, "products");

  // 해당 카테고리의 모든 제품을 가져옴
  const querySnapshot = await getDocs(query(collectionRef, where("category", "==", category)));

  // 가져온 제품 중에서 현재 제품은 제외하고 랜덤하게 선택
  const products = querySnapshot.docs.filter((doc) => doc.id !== productId).map((doc) => doc.data());

  // 랜덤하게 섞은 후, 필요한 개수만큼 잘라냄
  const randomProducts = shuffleArray(products).slice(0, limitParam);

  return randomProducts;
}

export async function fbGetProduct(productId: string) {
  const q = query(collection(db, "products"), where("id", "==", productId));
  const querySnapshot = await getDocs(q);

  let product = null;
  if (querySnapshot.docs.length > 0) {
    const doc = querySnapshot.docs[0];
    product = doc.data();
  }

  return product;
}

export async function fbAddProduct(product: ProductType) {
  const storage = getStorage();
  const productRef = doc(db, "products", product.id);

  const searchArray = [
    ...product.name.toLocaleLowerCase().split(" "),
    ...product.artist.toLocaleLowerCase().split(" "),
  ];

  await setDoc(productRef, {
    id: product.id,
    category: product.category,
    name: product.name,
    searchArray: searchArray,
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
        images.push(downloadURL);
      } catch (e) {
        console.error(`${index}번째 이미지 업로드 실패:`, e);
      }
    })
  );
  // docs에 이미지 url 업로드
  await updateDoc(productRef, { image: images });
}
export async function fbGetPrevImagesURL(id: string, images: string[]): Promise<string[]> {
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
export async function fbDeleteProduct(id: string) {
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
// 현재 재고 수량 업데이트로만 쓰임
export async function fbUpdateProduct(productId: string, stock: number) {
  // 이미지 수정 x
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, {
    stock: stock,
  });
}
