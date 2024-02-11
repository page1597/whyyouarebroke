import { BasketProductType, ProductType } from "@/types";
import { getUser, updateUserBasket } from "./firebase";

// 로컬 스토리지, 로그인 했을 경우 Db도 같이
export async function getBasket(userId: string | null) {
  console.log("get basket");
  let localStorageBasket = localStorage.getItem("basket");
  console.log("localStorageBasket: ", localStorageBasket);
  let localBasket = localStorageBasket === null ? [] : JSON.parse(localStorageBasket);

  if (userId) {
    try {
      const userData = await getUser(userId);
      const mergedBasket = [...localBasket, ...userData?.basket];
      console.log(mergedBasket);
      return userData?.basket;
    } catch (error) {
      console.error("데이터베이스에서 장바구니 정보를 가져오는 중 오류가 발생했습니다:", error);
      return localBasket;
    }
  } else {
    return localBasket;
  }
}

// 장바구니에 들어있는 상품인지 확인
export function isInBasket(productId: string) {
  console.log("isInBasket");

  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트
  const existingProductIndex = basket.findIndex((item: { id: string }) => item.id === productId);
  if (existingProductIndex !== -1) {
    return true;
  }
  return false;
}

// 로그아웃 한 상태에서 담고 로그인 했을때 동작만을 생각한거잖아. 근데 다시 로그아웃 하고 로그인하면 없어져. 당욘
// 로그아웃 -> 로그인 시 동작.
// 그러면 로그인 했을때 디비에 장바구니가 있으면?? 디비에서 장바구니에 꺼내서 합쳐져야함.
export async function copyBasketlocalToDB(userId: string) {
  console.log("copyBasketlocalToDB");
  let getBasket = localStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
  let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트
  localStorage.removeItem("basket");
  updateUserBasket(userId, basket);
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
    updateUserBasket(userId, basket);
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
    updateUserBasket(userId, basket);
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
      updateUserBasket(userId, basket);
    }
  }
}

// // 장바구니를 아예 지우기 -> 로그인 했다가 지워버렸을 때
// export function deleteBasket() {
//   localStorage.setItem("basket", "");
// }
