import { OrderInfoType } from "@/types/order";
import {
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  startAfter,
  limit,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from ".";

// 주문 추가
export async function fbAddOrder(order: OrderInfoType) {
  const orderRef = doc(db, "orders", order.merchant_uid);
  await setDoc(orderRef, order);
}

// 주문 상태 변경
export async function fbUpdateOrder(orderId: string, status: string) {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status: status,
  });
}

export async function fbGetOrders(
  userId: string | undefined | null,
  pageParam: number | null,
  limitParam: number | null
) {
  console.log(userId);
  let finalQuery = query(collection(db, "orders"));
  if (userId !== undefined && userId !== null) {
    finalQuery = query(finalQuery, where("buyer_uid", "==", userId));
  } else {
    console.log("user id is undefined");
    finalQuery = query(finalQuery, where("buyer_uid", "==", "none")); // 아무 값도 안나오게
  }
  if (pageParam) {
    finalQuery = query(finalQuery, startAfter(pageParam));
  }
  if (limitParam) {
    finalQuery = query(finalQuery, limit(limitParam));
  }
  const querySnapshot = await getDocs(finalQuery);

  const orders: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    orders.push(doc.data() as OrderInfoType);
  });
  return orders;
}
