import { BasketProductType } from "@/types/product";
import { doc, updateDoc } from "firebase/firestore";
import { db } from ".";

export async function fbUpdateUserBasket(userId: string, basket: BasketProductType[]) {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      basket: basket,
    });
  } catch (e) {
    console.error("에러: ", e);
  }
}
