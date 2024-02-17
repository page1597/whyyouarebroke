import { preloadImage, replaceAll } from "@/lib/utils";
import { categoryProductType } from "@/types/product";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

function ProductListWithCarousel({ productList }: { productList: categoryProductType[] }) {
  const navigate = useNavigate();
  return (
    <div>
      {productList?.map((categoryProduct, index) => (
        <div key={index} className="mb-16">
          <div className="flex justify-between items-end">
            <h3 className="text-xl my-5">{categoryProduct.category.toUpperCase()}</h3>
            <button
              name="more"
              onClick={() => {
                const formattedCategory = replaceAll(categoryProduct.category, ["-", ""], ["/", "-"], [" ", ""]);
                navigate(`/category/${formattedCategory}`);
              }}
            >
              더보기
            </button>
          </div>
          <Carousel opts={{ align: "start" }} className="w-11/12 ml-2 md:ml-5">
            <CarouselContent className="ml-0 md:-ml-1">
              {categoryProduct.products?.map((product: DocumentData) => (
                <CarouselItem key={product.id} className="pl-1 basis-1/2 md:basis-1/4">
                  <div className="p-2 flex justify-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        preloadImage(product.image, product.name);
                        navigate({ pathname: "/product", search: `?id=${product.id}` });
                      }}
                    >
                      {product.image ? (
                        <div className="relative overflow-hidden">
                          <img
                            decoding="async"
                            loading="lazy"
                            src={product["image"][0]}
                            width={240}
                            height={240}
                            className="h-60 w-60 object-contain transition-transform transform-cpu hover:scale-105"
                            alt={product.name}
                          />
                        </div>
                      ) : (
                        <div className="w-60 h-60 bg-zinc-100" />
                      )}
                      <div className="flex flex-col mt-3">
                        <div className="flex gap-2">
                          <div>[{product.format}]</div>
                          <div className="text-base">{product.name}</div>
                        </div>
                        <div className="mt-1 font-bold text-zinc-500">{product.price}원</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
}
export default ProductListWithCarousel;
