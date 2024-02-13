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
