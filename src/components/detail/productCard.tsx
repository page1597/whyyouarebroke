import { ProductType } from "@/types/product";
import { preloadImage } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, index }: { product: ProductType; index: number }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col justify-center h-full items-center cursor-pointer ${index !== 0 ? `mt-7` : `md-0`}`}
      key={product.id}
      onClick={() => {
        preloadImage(product.image, product.name);
        navigate({ pathname: "/product", search: `?id=${product.id}` });
      }}
    >
      <div className="sm:max-w-60 max-w-40">
        <div className="sm:flex hidden justify-center">
          {product.image ? (
            <div className="relative overflow-hidden">
              <img
                src={product["image"][0]}
                width={240}
                height={240}
                className="object-contain transition-transform transform-cpu hover:scale-105"
                alt={product.name}
              />
            </div>
          ) : (
            <div className="w-60 h-60 bg-zinc-100" />
          )}
        </div>
        <div className="sm:hidden flex h-40 justify-center items-center">
          {product.image ? (
            <div className="relative overflow-hidden">
              <img
                src={product["image"][0]}
                width={160}
                height={160}
                className="object-contain transition-transform transform-cpu hover:scale-105"
                alt={product.name}
              />
            </div>
          ) : (
            <div className="w-40 h-40 bg-zinc-100" />
          )}
        </div>
        <div className="text-sm font-bold text-zinc-800">
          <div className="mt-2 h-5 font-medium overflow-hidden text-ellipsis">
            [{product.format}] {product.name}
          </div>
          <div className="text-xs font-bold h-4 overflow-hidden text-ellipsis">{product.artist}</div>
          <div className="font-bold text-zinc-500 mt-1">{product.price.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
