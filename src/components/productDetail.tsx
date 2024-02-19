import { ProductType } from "@/types/product";
import { memo } from "react";
function ProductDetail({ product }: { product: ProductType }) {
  return (
    <div className="my-10">
      <div className="flex justify-center mb-8 md:mb-24">
        <div className="text-zinc-700">상품 상세</div>
      </div>
      <div className="flex justify-center items-center flex-col gap-3">
        {product.image.map((src: string, index: string) => (
          <img
            key={`${product.name}-${index}`}
            decoding="async"
            loading="lazy"
            id={product.name}
            alt={product.name}
            width={400}
            height={400}
            src={src}
          />
        ))}
      </div>
      <div className="my-16 whitespace-pre-line">{product.description}</div>
    </div>
  );
}
export default memo(ProductDetail, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});
