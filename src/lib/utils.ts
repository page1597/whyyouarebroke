import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Resizer from "react-image-file-resizer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resizeFile = (file: Blob): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "WEBP",
      80,
      0,
      (uri) => {
        resolve(URL.createObjectURL(uri as Blob));
      },
      "blob"
    );
  });
export async function blobUriToBlob(blobUri: string) {
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
export function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}

export function replaceAll(original: string, ...replacements: [searchValue: string, replaceValue: string][]) {
  let replacedString = original;
  replacements.forEach(([searchValue, replaceValue]) => {
    const regex = new RegExp(searchValue, "g");
    replacedString = replacedString.replace(regex, replaceValue);
  });
  return replacedString;
}

export function generateOrderNumber(productId: string) {
  // 상품 ID의 일부 (앞에서부터 4자리)

  const productIdShortened = productId.substring(0, 4);
  const currentDate = new Date();
  // 현재 날짜 및 시간을 포함한 주문 번호 생성 (상품 ID 일부 + 날짜 및 시간의 밀리초로 변환한 값)
  const orderNumber = `${productIdShortened}${+currentDate}`;

  return orderNumber;
}

export function preloadImage(src: string, alt: string) {
  const image = new Image();
  image.src = src;
  image.alt = alt;
}

// 배열을 랜덤하게 섞는 함수
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
