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
      300,
      300,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(URL.createObjectURL(uri as Blob));
      },
      "blob"
    );
  });
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
