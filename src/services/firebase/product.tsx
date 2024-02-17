import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
import { blobUriToBlob } from "@/lib/utils";

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
// 추천 상품 목록 가져오는 함수
export async function fbGetRandomProducts(productId: string, category: string, limitParam: number) {
  const collectionRef = collection(db, "products");
  // 같은 카테고리에 속하는 문서들을 필터링하여 가져옵니다.
  const querySnapshot = await getDocs(
    query(collectionRef, where("category", "==", category), where("id", "!=", productId))
  );

  // 가져온 문서들의 ID 목록을 생성합니다.
  const docIds = querySnapshot.docs.map((doc) => doc.id);
  let randomDocuments: DocumentData[] = [];

  if (docIds.length <= 4) {
    const q = query(collectionRef, where("id", "in", docIds));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      randomDocuments.push(doc.data());
    });
  } else {
    // 랜덤하게 4개의 문서를 선택
    while (true) {
      if (randomDocuments.length === limitParam) break;
      // 랜덤한 인덱스를 생성합니다.
      const randomIndex = Math.floor(Math.random() * docIds.length);

      // 해당 인덱스에 해당하는 문서를 가져옵니다.
      const docRef = doc(collectionRef, docIds[randomIndex]);
      const docSnapshot = await getDoc(docRef);

      // 문서가 존재하면 데이터를 추출합니다.
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const isIn = randomDocuments.some((document) => document.id === data.id);

        if (!isIn) {
          randomDocuments.push(data);
        }
      }
    }
  }
  return randomDocuments;
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
