import { OrderType } from "@/types/order";
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
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from ".";

// 주문 추가
export async function fbAddOrder(order: OrderType) {
  const orderRef = doc(db, "orders", order.merchant_uid);
  await setDoc(orderRef, order);
}

// // 주문 상태 변경 (구매자 - 주문 취소 등)
// export async function fbUpdateOrder(orderId: string, status: OrderStatusType) {
//   const orderRef = doc(db, "orders", orderId);
//   await updateDoc(orderRef, {
//     status: status,
//   });
// }
// 주문 상태 변경 (판매자)
export async function fbUpdateOrderStatus(orderId: string, status: string) {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status: status,
  });
}

export async function fbGetOrderStatus(orderId: string): Promise<DocumentData | undefined> {
  const result = await getDoc(doc(db, "orders", orderId)); // == merchant_uid
  return result.data();
}

export async function fbGetOrders(
  isAdmin: boolean,
  userId: string | undefined | null,
  pageParam: number | null,
  limitParam: number | null
) {
  let finalQuery = query(collection(db, "orders"), orderBy("orderedAt", "desc"));
  if (!isAdmin) {
    if (userId !== undefined && userId !== null) {
      finalQuery = query(finalQuery, where("buyer_uid", "==", userId));
    } else {
      finalQuery = query(finalQuery, where("buyer_uid", "==", "none")); // 아무 값도 안나오게
    }
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
    orders.push(doc.data() as OrderType);
  });
  return orders;
}
