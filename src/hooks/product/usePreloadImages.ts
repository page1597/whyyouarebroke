import { InfiniteData } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

type ProductListType = InfiniteData<DocumentData, unknown> | { category: string; products: DocumentData[] }[];

export default function usePreloadImages(productList: ProductListType | undefined, isLoading: boolean) {
  const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && productList) {
      let loadedImagesCount = 0;
      let totalImages = 0;
      let imagePromises: Promise<boolean>[] = [];

      const extractProducts = (data: ProductListType) => {
        if ("pages" in data) {
          return data.pages.flat();
        } else if (Array.isArray(data)) {
          return data.flatMap((category) => category.products);
        }
        return [];
      };

      const products = extractProducts(productList);
      totalImages = products.length;

      imagePromises = products.map((product: DocumentData) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = product.image[0];
          img.onload = () => {
            loadedImagesCount++;
            if (loadedImagesCount >= totalImages * 0.6) {
              setIsImagesLoaded(true);
            }
            resolve(true);
          };
          img.onerror = () => {
            loadedImagesCount++;
            if (loadedImagesCount >= totalImages * 0.6) {
              setIsImagesLoaded(true);
            }
            resolve(false);
          };
        });
      });

      Promise.race([
        Promise.all(imagePromises),
        new Promise((resolve) =>
          setTimeout(() => {
            setIsImagesLoaded(true);
            resolve(true);
          }, 2000)
        ),
      ]);
    }
  }, [isLoading, productList]);

  return { isImagesLoaded };
}
