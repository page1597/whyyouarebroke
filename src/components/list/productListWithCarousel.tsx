import { preloadImage, replaceAll } from "@/lib/utils";
import { categoryProductType } from "@/types/product";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

export default function ProductListWithCarousel({ productList }: { productList: categoryProductType[] }) {
  const navigate = useNavigate();
  return (
    <div className="sm:px-6 px-3 sm:ml-1 -ml-1 sm:-mr-6 -mr-3 ">
      {productList?.map((categoryProduct, index) => (
        <div key={index} className="lg:mb-16 mb-10">
          <div className="flex justify-between items-end mr-4 sm:mr-9 lg:my-5 my-3">
            <h3 className="lg:text-xl text-lg ml-1">{categoryProduct.category.toUpperCase()}</h3>
            <button
              name="more"
              className="lg:text-base text-sm"
              onClick={() => {
                const formattedCategory = replaceAll(categoryProduct.category, ["-", ""], ["/", "-"], [" ", ""]);
                navigate(`/category/${formattedCategory}`);
              }}
            >
              더보기
            </button>
          </div>
          <Carousel opts={{ align: "start" }} className="w-11/12 lg:ml-5 ml-2">
            <CarouselContent>
              {categoryProduct.products?.map((product: DocumentData) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 lg:ml-0 basis-1/2 flex justify-center items-center sm:basis-1/4"
                >
                  <div className="flex justify-center items-center">
                    <div
                      className="cursor-pointer flex justify-center flex-col"
                      onClick={() => {
                        preloadImage(product.image, product.name);
                        navigate({ pathname: "/product", search: `?id=${product.id}` });
                      }}
                    >
                      <div className="sm:flex hidden justify-center">
                        <div className="relative overflow-hidden">
                          <img
                            src={product["image"][0]}
                            width={240}
                            height={240}
                            className="object-contain transition-transform transform-cpu hover:scale-105"
                            alt={product.name}
                          />
                        </div>
                      </div>
                      <div className="sm:hidden flex justify-center items-center ">
                        <div className="relative overflow-hidden">
                          <img
                            src={product["image"][0]}
                            width={160}
                            height={160}
                            className="object-contain transition-transform transform-cpu hover:scale-105"
                            alt={product.name}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col lg:mt-3 mt-2 lg:text-base text-sm">
                        <div className="flex gap-1 h-6">
                          <div>[{product.format}]</div>
                          <div className="overflow-hidden">{product.name}</div>
                        </div>
                        <div className="lg:mt-1 font-bold text-zinc-500">{product.price.toLocaleString()}원</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="md:-mt-6" />
            <CarouselNext className="md:-mt-6" />
          </Carousel>
        </div>
      ))}
    </div>
  );
}
