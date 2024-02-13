import { BasketProductType } from "@/types/product";
import { doc, updateDoc } from "firebase/firestore";
import { db } from ".";

export async function fbUpdateUserBasket(userId: string, basket: BasketProductType[]) {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    basket: basket,
  });
}
