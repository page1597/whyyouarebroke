import { useLayoutEffect } from "react";

export const PreloadImage = ({ src, alt }: { src: string; alt: string }) => {
  useLayoutEffect(() => {
    const image = new Image();
    image.src = src;
    image.alt = alt;
  }, []);
};
