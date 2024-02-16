import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

function LazyImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [ref, inView] = useInView();

  useEffect(() => {
    let isCancelled = false;

    const loadImage = () => {
      const image = new Image();
      image.src = src;

      image.onload = () => {
        if (!isCancelled) {
          setImageSrc(src);
        }
      };

      image.onerror = () => {
        console.error("Failed to load image:", src);
      };
    };

    if (inView && !imageSrc) {
      loadImage();
    }

    return () => {
      isCancelled = true;
    };
  }, [src, imageSrc, inView]);

  return (
    <div ref={ref} className={className} style={{ width: width, height: height }}>
      {imageSrc && <img src={imageSrc} alt={alt} className={className} />}
    </div>
  );
}
export default LazyImage;
