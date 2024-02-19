import { useLayoutEffect } from "react";

export const PreloadImage = ({ src, alt }: { src: string; alt: string }) => {
  useLayoutEffect(() => {
    const image = new Image();
    image.src = src;
    image.alt = alt;
  }, []);

  //   return null; // 이미지를 화면에 보여주지 않으므로 null을 반환
};
