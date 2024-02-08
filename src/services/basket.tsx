import { BasketProductType, ProductType } from "@/types";
import { updateUser } from "./firebase";

// 로컬 스토리지, 로그인 했을 경우 Db도 같이
export function getBasket() {
  let getBasket = localStorage.getItem("basket");
  let basket = getBasket === null ? [] : JSON.parse(getBasket);
  return basket;
}
// 장바구니에 들어있는 상품인지 확인
export function isInBasket(productId: string) {
  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트
  const existingProductIndex = basket.findIndex((item: { id: string }) => item.id === productId);
  if (existingProductIndex !== -1) {
    return true;
  }
  return false;
}

export function copyBasketlocalToDB(userId: string) {
  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트
  updateUser(userId, basket);
}

// 장바구니에 추가
export function addToBasket(userId: string | null, product: ProductType, quantity: number) {
  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트

  // 상품이 이미 장바구니에 있는지 확인
  const existingProductIndex = basket.findIndex((item: { id: string }) => item.id === product.id);

  if (existingProductIndex !== -1) {
    // 이미 장바구니에 해당 상품이 있는 경우, 수량 업데이트
    basket[existingProductIndex].quantity = quantity;
  } else {
    // 장바구니에 해당 상품이 없는 경우, 새로 추가
    const newBasket: BasketProductType = {
      id: product.id,
      name: product.name,
      format: product.format,
      stock: product.stock,
      price: product.price,
      quantity: quantity, // 수량
      image: product.image,
    };
    basket.push(newBasket);
  }

  localStorage.setItem("basket", JSON.stringify(basket));

  if (userId) {
    // 로그인 한 상태라면
    // DB에도 업데이트
    updateUser(userId, basket);
  }
}

export function updateBasketProductStock(userId: string | null, basketProduct: BasketProductType, stock: number) {
  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트

  // 상품이 이미 장바구니에 있는지 확인
  const existingProductIndex = basket.findIndex((item: { id: string }) => item.id === basketProduct.id);

  if (existingProductIndex !== -1) {
    // 이미 장바구니에 해당 상품이 있는 경우, 수량 업데이트
    basket[existingProductIndex].stock = stock;
  }

  localStorage.setItem("basket", JSON.stringify(basket));

  if (userId) {
    // 로그인 한 상태라면
    // DB에도 업데이트
    updateUser(userId, basket);
  }
}

// 수량 조절은 불가
export function removeFromBasket(userId: string | null, productId: string) {
  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트

  // 지울 상품 찾기
  const productIndex = basket.findIndex((item: { id: string }) => item.id === productId);

  if (productIndex !== -1) {
    basket.splice(productIndex, 1);

    localStorage.setItem("basket", JSON.stringify(basket));

    if (userId) {
      // 로그인 한 상태라면 DB에도 업데이트
      updateUser(userId, basket);
    }
  }
}

// // 장바구니를 아예 지우기 -> 로그인 했다가 지워버렸을 때
// export function deleteBasket() {
//   localStorage.setItem("basket", "");
// }
